import { StyleSheet } from 'react-native';
import { cardStyles, checkboxStyles } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%' },
    checkboxArea: { width: 36, alignItems: 'center', justifyContent: 'center' },
    checkbox: checkboxStyles.box,
    checkboxSelected: checkboxStyles.boxSelected,
    card: { ...cardStyles.base, flex: 1 },
    cardShifted: {},
    cardDateRange: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 2 },
    cardDateRangeText: { fontSize: 16, color: C.textMuted },
    cardHeader: { ...cardStyles.header, paddingTop: 6, paddingBottom: 14 },
    priorityIcon: cardStyles.iconBadge,
    cardInfo: cardStyles.info,
    cardTitle: cardStyles.title,
    cardMeta: { ...cardStyles.meta, gap: 6 },
    cardDate: { fontSize: 16, color: C.textMuted },
    cardPriority: { fontSize: 13, color: C.textMuted },
    cardPriorityLow: { color: '#5A9E5A' },
    cardPriorityMedium: { color: '#9E8E3A' },
    cardPriorityHigh: { color: '#9E4A4A' },
    completedTitle: { color: C.textDisabled, textDecorationLine: 'line-through' },
    chevron: { padding: 4 },
    divider: cardStyles.divider,
    cardBody: { ...cardStyles.body, gap: 14 },
    descriptionContainer: { ...cardStyles.detailBox, padding: 12, gap: 6 },
    descriptionLabel: cardStyles.detailLabel,
    descriptionText: { ...cardStyles.detailValue },
    notesContainer: { ...cardStyles.detailBox, padding: 12, gap: 6 },
    notesLabel: cardStyles.detailLabel,
    notesText: { fontSize: 14, color: C.textMuted, fontStyle: 'italic', lineHeight: 20 },
    cardActions: { flexDirection: 'row', gap: 8 },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: R.md,
        borderWidth: 2,
        gap: 6
    },
    completeButton: { backgroundColor: C.greenBg, borderColor: C.greenBorder },
    completeButtonDone: { backgroundColor: '#2A4A35', borderColor: '#4A8A60' },
    editButton: { backgroundColor: C.bgDivider, borderColor: C.borderMid },
    deleteButton: { backgroundColor: C.accentRedLight, borderColor: C.accentRedLightBorder },
    actionButtonText: { fontSize: 14, color: C.accentBlue },
    completeButtonText: { color: C.accentGreen },
    completeButtonTextDone: { color: '#8AE0A8' },
    deleteButtonText: { color: C.accentRed }
});

export default styles;