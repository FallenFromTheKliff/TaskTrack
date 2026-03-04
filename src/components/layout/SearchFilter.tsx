import { useState, useRef, useEffect } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText, PlayerTextInput } from '@/components/fields/forms/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { formatDateShort, getTodayString } from '@/utils/shared/dateUtils';
import {
    DISPLAY_OPTIONS, FILTER_PRIORITY_OPTIONS, FILTER_STATUS_OPTIONS,
    FILTER_TRASH_STATUS_OPTIONS, SEARCH_PLACEHOLDERS, FILTER_PANEL_HEIGHTS
} from '@/utils/shared/constantUtils';
import { makeSearchFilterStyles } from '@/styles/components/layout/SearchFilterStyles';

import CalendarModal from '@/components/modals/CalendarModal';

type SearchFilterVariant = 'tasks' | 'history' | 'trash';
type SearchFilterProps = {
    variant?: SearchFilterVariant;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedDate?: string;
    onDateChange?: (date: string) => void;
    selectedEndDate?: string;
    onEndDateChange?: (date: string) => void;
    taskDisplayCount?: number;
    onDisplayCountChange?: (count: number) => void;
    selectedPriority?: string;
    onPriorityChange?: (priority: string) => void;
    selectedStatus?: string;
    onStatusChange?: (status: string) => void;
};

export default function SearchFilter({
    variant = 'tasks', searchQuery, onSearchChange,
    selectedDate, onDateChange, selectedEndDate, onEndDateChange,
    taskDisplayCount, onDisplayCountChange, selectedPriority, onPriorityChange,
    selectedStatus, onStatusChange
}: SearchFilterProps) {
    const { colors, activeIconColor } = useTheme();
    const s = makeSearchFilterStyles(colors, activeIconColor);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isStartCalOpen, setIsStartCalOpen] = useState(false);
    const [isEndCalOpen, setIsEndCalOpen] = useState(false);
    const filterHeightAnim = useRef(new Animated.Value(0)).current;
    const filterOpacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(filterHeightAnim, { toValue: isFilterOpen ? FILTER_PANEL_HEIGHTS[variant] : 0, duration: 300, useNativeDriver: false }),
            Animated.timing(filterOpacityAnim, { toValue: isFilterOpen ? 1 : 0, duration: 300, useNativeDriver: false })
        ]).start();
    }, [isFilterOpen]);

    const handleStartDateSelect = (date: string) => {
        onDateChange?.(date);
        if (selectedEndDate && selectedEndDate <= date) onEndDateChange?.('');
        setIsStartCalOpen(false);
    };
    const handleEndDateSelect = (date: string) => {
        if (!selectedDate) onDateChange?.(getTodayString());
        onEndDateChange?.(date);
        setIsEndCalOpen(false);
    };
    const handleResetStartDate = () => { onDateChange?.(''); onEndDateChange?.(''); setIsStartCalOpen(false); };
    const handleResetEndDate = () => { onEndDateChange?.(''); setIsEndCalOpen(false); };

    const allowPastDates = variant !== 'tasks';
    const startLabel = selectedDate ? formatDateShort(selectedDate) : 'All Dates';
    const endLabel = selectedEndDate ? formatDateShort(selectedEndDate) : 'Due Date';
    const endDateMinDate = selectedDate || getTodayString();
    const ic = activeIconColor ?? colors.accentBlue;

    const DateRangePickers = () => (
        <View style={s.filterSection}>
            <PlayerText style={s.filterLabel}>Date Range:</PlayerText>
            <View style={s.dateRangeRow}>
                <Pressable style={[s.datePickerButton, { flex: 1 }]} onPress={() => setIsStartCalOpen(true)}>
                    <Ionicons name="today-outline" size={16} color={ic} />
                    <PlayerText style={s.datePickerText} numberOfLines={1}>{startLabel}</PlayerText>
                </Pressable>
                <Pressable
                    style={[s.datePickerButton, !selectedEndDate && s.datePickerButtonDim, { flex: 1 }]}
                    onPress={() => setIsEndCalOpen(true)}
                >
                    <Ionicons name="flag-outline" size={16} color={selectedEndDate ? ic : (activeIconColor ?? colors.textMuted)} />
                    <PlayerText style={[s.datePickerText, !selectedEndDate && { color: colors.textMuted }]} numberOfLines={1}>
                        {endLabel}
                    </PlayerText>
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={s.searchFilterContainer}>
            <View style={s.searchBarContainer}>
                <Ionicons name="search" size={20} color={ic} style={{ marginRight: 10 }} />
                <PlayerTextInput
                    placeholder={SEARCH_PLACEHOLDERS[variant]}
                    value={searchQuery}
                    onChangeText={onSearchChange}
                    style={s.searchInput}
                />
                {searchQuery.length > 0 && (
                    <Pressable onPress={() => onSearchChange('')} style={{ marginRight: 4 }}>
                        <Ionicons name="close-circle" size={18} color={activeIconColor ?? colors.textMuted} />
                    </Pressable>
                )}
                <Pressable onPress={() => setIsFilterOpen(!isFilterOpen)} style={s.filterButton}>
                    <Ionicons name={isFilterOpen ? 'filter' : 'filter-outline'} size={20} color={ic} />
                </Pressable>
            </View>
            <Animated.View style={[
                s.filterPanel, s.filterPanelAbsolute,
                { height: filterHeightAnim, opacity: filterOpacityAnim, overflow: 'hidden' }
            ]}>
                <View style={s.filterPanelInner}>
                    {variant === 'tasks' && (
                        <>
                            <View style={s.filterSection}>
                                <PlayerText style={s.filterLabel}>Display:</PlayerText>
                                <View style={s.filterOptions}>
                                    {DISPLAY_OPTIONS.map(opt => {
                                        const isActive = taskDisplayCount === opt.value;
                                        return (
                                            <Pressable
                                                key={opt.value}
                                                style={[s.filterOptionButton, isActive && s.filterOptionButtonActive]}
                                                onPress={() => onDisplayCountChange?.(opt.value)}
                                            >
                                                <PlayerText style={[s.filterOptionText, isActive && s.filterOptionTextActive]}>
                                                    {opt.label}
                                                </PlayerText>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>
                            <View style={s.filterSection}>
                                <PlayerText style={s.filterLabel}>Priority:</PlayerText>
                                <View style={s.filterOptions}>
                                    {FILTER_PRIORITY_OPTIONS.map(opt => {
                                        const isActive = selectedPriority === opt.value;
                                        return (
                                            <Pressable
                                                key={opt.value}
                                                style={[s.filterOptionButton, isActive && { borderColor: opt.activeBorder, backgroundColor: opt.activeBg }]}
                                                onPress={() => onPriorityChange?.(opt.value)}
                                            >
                                                <PlayerText style={[s.filterOptionText, isActive && { color: opt.activeText }]}>
                                                    {opt.label}
                                                </PlayerText>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>
                            <DateRangePickers />
                        </>
                    )}
                    {variant === 'history' && (
                        <>
                            <View style={s.filterSection}>
                                <PlayerText style={s.filterLabel}>Status:</PlayerText>
                                <View style={s.filterOptions}>
                                    {FILTER_STATUS_OPTIONS.map(opt => {
                                        const isActive = selectedStatus === opt.value;
                                        return (
                                            <Pressable
                                                key={opt.value}
                                                style={[s.filterOptionButton, isActive && { borderColor: opt.activeBorder, backgroundColor: opt.activeBg }]}
                                                onPress={() => onStatusChange?.(opt.value)}
                                            >
                                                <PlayerText style={[s.filterOptionText, isActive && { color: opt.activeText }]}>
                                                    {opt.label}
                                                </PlayerText>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>
                            <DateRangePickers />
                        </>
                    )}
                    {variant === 'trash' && (
                        <>
                            <View style={s.filterSection}>
                                <PlayerText style={s.filterLabel}>Status:</PlayerText>
                                <View style={s.filterOptions}>
                                    {FILTER_TRASH_STATUS_OPTIONS.map(opt => {
                                        const isActive = selectedStatus === opt.value;
                                        return (
                                            <Pressable
                                                key={opt.value}
                                                style={[s.filterOptionButton, isActive && { borderColor: opt.activeBorder, backgroundColor: opt.activeBg }]}
                                                onPress={() => onStatusChange?.(opt.value)}
                                            >
                                                <PlayerText style={[s.filterOptionText, isActive && { color: opt.activeText }]}>
                                                    {opt.label}
                                                </PlayerText>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>
                            <DateRangePickers />
                        </>
                    )}
                </View>
            </Animated.View>
            <CalendarModal
                isVisible={isStartCalOpen}
                selectedDate={selectedDate || ''}
                onSelect={handleStartDateSelect}
                onClose={() => setIsStartCalOpen(false)}
                onReset={handleResetStartDate}
                allowPastDates={allowPastDates}
            />
            <CalendarModal
                isVisible={isEndCalOpen}
                selectedDate={selectedEndDate || ''}
                onSelect={handleEndDateSelect}
                onClose={() => setIsEndCalOpen(false)}
                onReset={selectedEndDate ? handleResetEndDate : undefined}
                allowPastDates={allowPastDates}
                minDate={endDateMinDate}
                blockToday={!selectedDate}
            />
        </View>
    );
}