import { useState, useEffect, useRef } from 'react';
import { View, Pressable, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { getTodayString, toDateString, getMonthLabel, DAY_NAMES } from '@/utils/shared/dateUtils';

import styles from '@/styles/components/CalendarStyles';

type CalendarProps = {
    isVisible: boolean;
    selectedDate: string;
    onDateSelect: (date: string) => void;
    onClose: () => void;
    onReset?: () => void;
    allowPastDates?: boolean;
    minDate?: string;
    blockToday?: boolean;
};

export default function CalendarModal({ isVisible, selectedDate, onDateSelect, onClose, onReset, allowPastDates = false, minDate, blockToday = false }: CalendarProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-50)).current;
    const monthSlideAnim = useRef(new Animated.Value(0)).current;
    const monthFadeAnim = useRef(new Animated.Value(1)).current;

    const todayString = getTodayString();
    const activeDate = selectedDate || '';

    const getMonthFromDateString = (ds: string) => {
        if (!ds) {
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), 1);
        }
        const [y, m] = ds.split('-').map(Number);
        return new Date(y, m - 1, 1);
    };

    const [currentMonth, setCurrentMonth] = useState(() => getMonthFromDateString(selectedDate));
    const [displayedLabel, setDisplayedLabel] = useState(() => getMonthLabel(getMonthFromDateString(selectedDate)));

    useEffect(() => {
        if (isVisible) {
            const month = getMonthFromDateString(selectedDate);
            setCurrentMonth(month);
            setDisplayedLabel(getMonthLabel(month));
            monthSlideAnim.setValue(0);
            monthFadeAnim.setValue(1);
            fadeAnim.setValue(0);
            slideAnim.setValue(-50);
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
                Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 40, useNativeDriver: true })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
                Animated.timing(slideAnim, { toValue: -50, duration: 200, useNativeDriver: true })
            ]).start();
        }
    }, [isVisible]);

    const isDateDisabled = (year: number, month: number, day: number) => {
        const dateStr = toDateString(year, month, day);
        if (minDate) return dateStr <= minDate;
        if (blockToday && dateStr === todayString) return true;
        if (!allowPastDates) return dateStr < todayString;
        return false;
    };

    const animateMonthLabel = (direction: number, newDate: Date) => {
        const newLabel = getMonthLabel(newDate);
        const exitTo = direction > 0 ? -40 : 40;
        const enterFrom = direction > 0 ? 40 : -40;
        Animated.parallel([
            Animated.timing(monthSlideAnim, { toValue: exitTo, duration: 180, useNativeDriver: true }),
            Animated.timing(monthFadeAnim, { toValue: 0, duration: 180, useNativeDriver: true })
        ]).start(() => {
            setDisplayedLabel(newLabel);
            monthSlideAnim.setValue(enterFrom);
            Animated.parallel([
                Animated.timing(monthSlideAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
                Animated.timing(monthFadeAnim, { toValue: 1, duration: 180, useNativeDriver: true })
            ]).start();
        });
    };

    const changeMonth = (direction: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1);
        animateMonthLabel(direction, newDate);
        setCurrentMonth(newDate);
    };

    const handleDatePress = (day: number) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        if (isDateDisabled(year, month, day)) return;
        const dateString = toDateString(year, month, day);
        onDateSelect(dateString);
        onClose();
    };

    const handleReset = () => {
        onReset?.();
        onClose();
    };

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<View key={`e-${i}`} style={styles.calendarDayEmpty} />);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const disabled = isDateDisabled(year, month, day);
            const dateString = toDateString(year, month, day);
            const isSelected = activeDate !== '' && dateString === activeDate;
            days.push(
                <Pressable
                    key={day}
                    style={[styles.calendarDay, disabled && styles.calendarDayDisabled, isSelected && styles.calendarDaySelected]}
                    onPress={() => handleDatePress(day)}
                    disabled={disabled}
                >
                    <PlayerText style={[styles.calendarDayText, disabled && styles.calendarDayTextDisabled, isSelected && styles.calendarDayTextSelected]}>
                        {day}
                    </PlayerText>
                </Pressable>
            );
        }
        return days;
    };

    return (
        <Modal visible={isVisible} transparent>
            <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                <View style={styles.modalBlur} />
                <Animated.View style={[styles.calendarContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.calendarHeader}>
                        <Pressable onPress={() => changeMonth(-1)} style={styles.calendarNavButton}>
                            <Ionicons name="chevron-back" size={24} color="#8EA7C1" />
                        </Pressable>
                        <Animated.View style={{ transform: [{ translateX: monthSlideAnim }], opacity: monthFadeAnim }}>
                            <PlayerText style={styles.calendarMonthText}>{displayedLabel}</PlayerText>
                        </Animated.View>
                        <Pressable onPress={() => changeMonth(1)} style={styles.calendarNavButton}>
                            <Ionicons name="chevron-forward" size={24} color="#8EA7C1" />
                        </Pressable>
                    </View>
                    <View style={styles.calendarDayNames}>
                        {DAY_NAMES.map(name => (
                            <View key={name} style={styles.calendarDayName}>
                                <PlayerText style={styles.calendarDayNameText}>{name}</PlayerText>
                            </View>
                        ))}
                    </View>
                    <View style={styles.calendarGrid}>{renderDays()}</View>
                    <View style={styles.calendarFooter}>
                        {onReset && (
                            <Pressable style={[styles.calendarCloseButton, styles.calendarResetButton]} onPress={handleReset}>
                                <Ionicons name="refresh-outline" size={18} color='#C47A7A' style={{ marginRight: 6 }} />
                                <PlayerText style={styles.calendarResetText}>Reset</PlayerText>
                            </Pressable>
                        )}
                        <Pressable style={styles.calendarCloseButton} onPress={onClose}>
                            <PlayerText style={styles.calendarCloseText}>Close</PlayerText>
                        </Pressable>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}