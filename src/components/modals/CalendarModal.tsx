import { useState } from 'react';
import { View, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { MONTH_NAMES_FULL, DAY_NAMES, getTodayString } from '@/utils/shared/dateUtils';
import { makeCalendarStyles } from '@/styles/modals/CalendarStyles';

type CalendarModalProps = {
    isVisible: boolean;
    selectedDate: string;
    minDate?: string;
    blockToday?: boolean;
    onSelect: (date: string) => void;
    onClose: () => void;
    onReset?: () => void;
    allowPastDates?: boolean;
};

function parseYMD(dateStr: string): { year: number; month: number; day: number } {
    const [year, month, day] = dateStr.split('-').map(Number);
    return { year, month, day };
}
function formatYMD(year: number, month: number, day: number): string {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number): number {
    return new Date(year, month - 1, 1).getDay();
}

export default function CalendarModal({ isVisible, selectedDate, minDate, blockToday = false, onSelect, onClose, onReset, allowPastDates }: CalendarModalProps) {
    const { colors, activeIconColor } = useTheme();
    const s = makeCalendarStyles(colors);

    const today = selectedDate || new Date().toISOString().split('T')[0];
    const { year: initYear, month: initMonth } = parseYMD(today);
    const [viewYear, setViewYear] = useState(initYear);
    const [viewMonth, setViewMonth] = useState(initMonth);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDow = getFirstDayOfWeek(viewYear, viewMonth);

    const handlePrevMonth = () => {
        if (viewMonth === 1) { setViewMonth(12); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const handleNextMonth = () => {
        if (viewMonth === 12) { setViewMonth(1); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const isDisabled = (day: number) => {
        const dateStr = formatYMD(viewYear, viewMonth, day);
        if (blockToday && dateStr === getTodayString()) return true;
        return !!(!allowPastDates && minDate && dateStr < minDate);

    };

    const isSelected = (day: number) => selectedDate === formatYMD(viewYear, viewMonth, day);
    const ic = activeIconColor ?? colors.accentBlue;

    return (
        <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={s.modalOverlay}>
                <Pressable style={s.modalBlur} onPress={onClose} />
                <View style={s.calendarContainer}>
                    <View style={s.calendarHeader}>
                        <Pressable style={s.calendarNavButton} onPress={handlePrevMonth}>
                            <Ionicons name="chevron-back" size={24} color={ic} />
                        </Pressable>
                        <PlayerText style={s.calendarMonthText}>
                            {MONTH_NAMES_FULL[viewMonth - 1]} {viewYear}
                        </PlayerText>
                        <Pressable style={s.calendarNavButton} onPress={handleNextMonth}>
                            <Ionicons name="chevron-forward" size={24} color={ic} />
                        </Pressable>
                    </View>
                    <View style={s.calendarDayNames}>
                        {DAY_NAMES.map(d => (
                            <View key={d} style={s.calendarDayName}>
                                <PlayerText style={s.calendarDayNameText}>{d}</PlayerText>
                            </View>
                        ))}
                    </View>
                    <View style={s.calendarGrid}>
                        {Array.from({ length: firstDow }).map((_, i) => (
                            <View key={`empty-${i}`} style={s.calendarDayEmpty} />
                        ))}
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                            const disabled = isDisabled(day);
                            const selected = isSelected(day);
                            return (
                                <Pressable
                                    key={day}
                                    style={[s.calendarDay, disabled && s.calendarDayDisabled, selected && s.calendarDaySelected]}
                                    onPress={() => !disabled && onSelect(formatYMD(viewYear, viewMonth, day))}
                                    disabled={disabled}
                                >
                                    <PlayerText style={[
                                        s.calendarDayText,
                                        disabled && s.calendarDayTextDisabled,
                                        selected && s.calendarDayTextSelected
                                    ]}>
                                        {day}
                                    </PlayerText>
                                </Pressable>
                            );
                        })}
                    </View>
                    <View style={s.calendarFooter}>
                        {onReset && (
                            <Pressable style={[s.calendarCloseButton, s.calendarResetButton]} onPress={onReset}>
                                <PlayerText style={[s.calendarCloseText, s.calendarResetText]}>Clear</PlayerText>
                            </Pressable>
                        )}
                        <Pressable style={s.calendarCloseButton} onPress={onClose}>
                            <PlayerText style={s.calendarCloseText}>Done</PlayerText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}