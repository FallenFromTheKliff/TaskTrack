import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeModalBaseStyles } from '@/styles/shared/common';
import { R } from '@/styles/shared/tokens';

export function makeCalendarStyles(colors: ThemeColors, activeIconColor?: string | null) {
    const ic = activeIconColor ?? colors.accentBlue;
    const modal = makeModalBaseStyles(colors);
    return StyleSheet.create({
        modalOverlay: modal.overlay,
        modalBlur: modal.blur,
        calendarContainer: {
            backgroundColor: colors.bgPanel,
            borderRadius: R.xl,
            borderWidth: 2,
            borderColor: colors.borderSub,
            width: '90%',
            maxWidth: 400,
            padding: 15
        },
        calendarHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            paddingBottom: 15,
            borderBottomWidth: 2,
            borderBottomColor: colors.borderSub
        },
        calendarNavButton: { padding: 8 },
        calendarMonthText: { fontSize: 24, color: colors.textPrimary },
        calendarDayNames: { flexDirection: 'row', marginBottom: 10 },
        calendarDayName: { flex: 1, alignItems: 'center' },
        calendarDayNameText: { fontSize: 18, color: colors.textMuted },
        calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
        calendarDay: {
            width: '13.28%',
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.bgDivider,
            borderRadius: R.sm,
            borderWidth: 1,
            borderColor: colors.borderMid
        },
        calendarDayEmpty: { width: '13.28%', aspectRatio: 1 },
        calendarDayDisabled: { backgroundColor: colors.bgPanel, opacity: 0.5 },
        calendarDaySelected: { backgroundColor: colors.borderMid, borderColor: ic, borderWidth: 2 },
        calendarDayText: { fontSize: 20, color: ic },
        calendarDayTextDisabled: { color: colors.textDisabled },
        calendarDayTextSelected: { color: colors.textPrimary, fontWeight: 'bold' },
        calendarFooter: {
            marginTop: 20,
            paddingTop: 15,
            borderTopWidth: 2,
            borderTopColor: colors.borderSub,
            flexDirection: 'row',
            gap: 10
        }
    });
}