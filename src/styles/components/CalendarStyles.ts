import { StyleSheet } from 'react-native';
import { modalOverlay, modalBlur, modalPanel, panelHeader } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    modalOverlay: modalOverlay,
    modalBlur: modalBlur,
    calendarContainer: { ...modalPanel, width: '90%', maxWidth: 400, padding: 15 },
    calendarHeader: {
        ...panelHeader,
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 15,
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderBottomWidth: 2,
        borderBottomColor: C.borderSub
    },
    calendarNavButton: { padding: 8 },
    calendarMonthText: { fontSize: 24, color: C.textPrimary },
    calendarDayNames: { flexDirection: 'row', marginBottom: 10 },
    calendarDayName: { flex: 1, alignItems: 'center' },
    calendarDayNameText: { fontSize: 18, color: C.textMuted },
    calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    calendarDay: {
        width: '13.28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: C.bgDivider,
        borderRadius: R.sm,
        borderWidth: 1,
        borderColor: C.borderMid
    },
    calendarDayEmpty: { width: '13.28%', aspectRatio: 1 },
    calendarDayDisabled: { backgroundColor: C.bgPanel, opacity: 0.5 },
    calendarDaySelected: { backgroundColor: C.borderMid, borderColor: C.accentBlue, borderWidth: 2 },
    calendarDayText: { fontSize: 20, color: C.accentBlue },
    calendarDayTextDisabled: { color: C.textDisabled },
    calendarDayTextSelected: { color: C.textPrimary, fontWeight: 'bold' },
    calendarFooter: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: C.borderSub,
        flexDirection: 'row',
        gap: 10
    },
    calendarCloseButton: {
        flex: 1,
        backgroundColor: C.bgDivider,
        paddingVertical: 8,
        borderRadius: R.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: C.borderMid,
        flexDirection: 'row'
    },
    calendarCloseText: { fontSize: 24, color: C.accentBlue },
    calendarResetButton: { flex: 1, paddingHorizontal: 4, backgroundColor: C.accentRedLight, borderColor: C.accentRedLightBorder },
    calendarResetText: { fontSize: 20, color: C.accentRed }
});

export default styles;