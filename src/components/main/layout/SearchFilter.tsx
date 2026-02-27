import { useState, useRef, useEffect } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlayerText, PlayerTextInput } from '@/components/fields/PlayerText';
import { formatDateShort, getTodayString } from '@/utils/shared/dateUtils';
import { DISPLAY_OPTIONS, FILTER_PRIORITY_OPTIONS, FILTER_STATUS_OPTIONS, FILTER_TRASH_STATUS_OPTIONS, SEARCH_PLACEHOLDERS, FILTER_PANEL_HEIGHTS } from '@/utils/shared/constantUtils';
import CalendarModal from '@/components/modals/CalendarModal';
import styles from '@/styles/components/SearchFilterStyles';

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
    variant = 'tasks',
    searchQuery,
    onSearchChange,
    selectedDate,
    onDateChange,
    selectedEndDate,
    onEndDateChange,
    taskDisplayCount,
    onDisplayCountChange,
    selectedPriority,
    onPriorityChange,
    selectedStatus,
    onStatusChange
}: SearchFilterProps) {
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
    const endDateMinDate = variant === 'tasks' ? selectedDate : (selectedDate || getTodayString());
    const DateRangePickers = () => (
        <View style={styles.filterSection}>
            <PlayerText style={styles.filterLabel}>Date Range:</PlayerText>
            <View style={styles.dateRangeRow}>
                <Pressable style={[styles.datePickerButton, { flex: 1 }]} onPress={() => setIsStartCalOpen(true)}>
                    <Ionicons name="today-outline" size={16} color="#8EA7C1" />
                    <PlayerText style={styles.datePickerText} numberOfLines={1}>{startLabel}</PlayerText>
                </Pressable>
                <Pressable
                    style={[styles.datePickerButton, !selectedEndDate && styles.datePickerButtonDim, { flex: 1 }]}
                    onPress={() => setIsEndCalOpen(true)}
                >
                    <Ionicons name="flag-outline" size={16} color={selectedEndDate ? '#8EA7C1' : '#6D8196'} />
                    <PlayerText style={[styles.datePickerText, !selectedEndDate && { color: '#6D8196' }]} numberOfLines={1}>
                        {endLabel}
                    </PlayerText>
                </Pressable>
            </View>
        </View>
    );
    return (
        <View style={styles.searchFilterContainer}>
            <View style={styles.searchBarContainer}>
                <Ionicons name="search" size={20} color="#8EA7C1" style={{ marginRight: 10 }} />
                <PlayerTextInput
                    placeholder={SEARCH_PLACEHOLDERS[variant]}
                    value={searchQuery}
                    onChangeText={onSearchChange}
                    style={styles.searchInput}
                />
                {searchQuery.length > 0 && (
                    <Pressable onPress={() => onSearchChange('')} style={{ marginRight: 4 }}>
                        <Ionicons name="close-circle" size={18} color="#6D8196" />
                    </Pressable>
                )}
                <Pressable onPress={() => setIsFilterOpen(!isFilterOpen)} style={styles.filterButton}>
                    <Ionicons name={isFilterOpen ? 'filter' : 'filter-outline'} size={20} color="#8EA7C1" />
                </Pressable>
            </View>
            <Animated.View style={[styles.filterPanel, styles.filterPanelAbsolute, { height: filterHeightAnim, opacity: filterOpacityAnim, overflow: 'hidden' }]}>
                <View style={styles.filterPanelInner}>
                    {variant === 'tasks' && (
                        <>
                            <View style={styles.filterSection}>
                                <PlayerText style={styles.filterLabel}>Display:</PlayerText>
                                <View style={styles.filterOptions}>
                                    {DISPLAY_OPTIONS.map((opt) => {
                                        const isActive = taskDisplayCount === opt.value;
                                        return (
                                            <Pressable
                                                key={opt.value}
                                                style={[styles.filterOptionButton, isActive && styles.filterOptionButtonActive]}
                                                onPress={() => onDisplayCountChange?.(opt.value)}
                                            >
                                                <PlayerText style={[styles.filterOptionText, isActive && styles.filterOptionTextActive]}>
                                                    {opt.label}
                                                </PlayerText>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>
                            <View style={styles.filterSection}>
                                <PlayerText style={styles.filterLabel}>Priority:</PlayerText>
                                <View style={styles.filterOptions}>
                                    {FILTER_PRIORITY_OPTIONS.map((opt) => {
                                        const isActive = selectedPriority === opt.value;
                                        return (
                                            <Pressable
                                                key={opt.value}
                                                style={[styles.filterOptionButton, isActive && { borderColor: opt.activeBorder, backgroundColor: opt.activeBg }]}
                                                onPress={() => onPriorityChange?.(opt.value)}
                                            >
                                                <PlayerText style={[styles.filterOptionText, isActive && { color: opt.activeText }]}>
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
                            <View style={styles.filterSection}>
                                <PlayerText style={styles.filterLabel}>Status:</PlayerText>
                                <View style={styles.filterOptions}>
                                    {FILTER_STATUS_OPTIONS.map((opt) => {
                                        const isActive = selectedStatus === opt.value;
                                        return (
                                            <Pressable
                                                key={opt.value}
                                                style={[styles.filterOptionButton, isActive && { borderColor: opt.activeBorder, backgroundColor: opt.activeBg }]}
                                                onPress={() => onStatusChange?.(opt.value)}
                                            >
                                                <PlayerText style={[styles.filterOptionText, isActive && { color: opt.activeText }]}>
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
                            <View style={styles.filterSection}>
                                <PlayerText style={styles.filterLabel}>Status:</PlayerText>
                                <View style={styles.filterOptions}>
                                    {FILTER_TRASH_STATUS_OPTIONS.map((opt) => {
                                        const isActive = selectedStatus === opt.value;
                                        return (
                                            <Pressable
                                                key={opt.value}
                                                style={[styles.filterOptionButton, isActive && { borderColor: opt.activeBorder, backgroundColor: opt.activeBg }]}
                                                onPress={() => onStatusChange?.(opt.value)}
                                            >
                                                <PlayerText style={[styles.filterOptionText, isActive && { color: opt.activeText }]}>
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
                onDateSelect={handleStartDateSelect}
                onClose={() => setIsStartCalOpen(false)}
                onReset={selectedDate ? handleResetStartDate : undefined}
                allowPastDates={allowPastDates}
            />
            <CalendarModal
                isVisible={isEndCalOpen}
                selectedDate={selectedEndDate || ''}
                onDateSelect={handleEndDateSelect}
                onClose={() => setIsEndCalOpen(false)}
                onReset={selectedEndDate ? handleResetEndDate : undefined}
                allowPastDates={allowPastDates}
                minDate={endDateMinDate}
                blockToday={variant === 'tasks'}
            />
        </View>
    );
}