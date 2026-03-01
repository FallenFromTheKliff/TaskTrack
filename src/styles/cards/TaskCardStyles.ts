import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeCardBaseStyles } from '@/styles/shared/common';
import { R } from '@/styles/shared/tokens';

export function makeTaskCardStyles(colors: ThemeColors, activeIconColor?: string | null) {
    const base = makeCardBaseStyles(colors);
    return StyleSheet.create({
        cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%' },
        checkboxArea: { width: 36, alignItems: 'center', justifyContent: 'center' },
        checkbox: {
            width: 22,
            height: 22,
            borderRadius: R.sm,
            borderWidth: 2,
            borderColor: colors.borderStrong,
            backgroundColor: colors.bgPanel,
            alignItems: 'center',
            justifyContent: 'center'
        },
        checkboxSelected: { backgroundColor: colors.accentRed, borderColor: colors.accentRed },
        card: { ...base.card, flex: 1 },
        cardShifted: { marginLeft: 4 },
        cardDateRange: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 2 },
        cardDateRangeText: { fontSize: 16, color: colors.textMuted },
        cardHeader: { ...base.cardHeader, paddingTop: 6, paddingBottom: 14 },
        priorityIcon: base.iconBadge,
        cardInfo: base.cardInfo,
        cardTitle: base.cardTitle,
        completedTitle: { color: colors.textDisabled, textDecorationLine: 'line-through' },
        cardMeta: { ...base.cardMeta, gap: 6 },
        cardPriority: { fontSize: 13 },
        chevron: { padding: 4 },
        divider: base.divider,
        cardBody: { ...base.cardBody, gap: 14 },
        descriptionContainer: { ...base.detailBox, padding: 12, gap: 6 },
        descriptionLabel: base.detailLabel,
        descriptionText: base.detailValue,
        notesContainer: { ...base.detailBox, padding: 12, gap: 6 },
        notesLabel: base.detailLabel,
        notesText: { fontSize: 14, color: colors.textMuted, fontStyle: 'italic', lineHeight: 20 },
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
        completeButton: { backgroundColor: colors.greenBg, borderColor: colors.greenBorder },
        completeButtonDone: { backgroundColor: colors.bgDivider, borderColor: colors.borderSub },
        editButton: { backgroundColor: colors.bgInputDark, borderColor: colors.borderMid },
        deleteButton: { backgroundColor: colors.accentRedLight, borderColor: colors.accentRedLightBorder },
        actionButtonText: { fontSize: 14, color: activeIconColor ?? colors.textMuted },
        completeButtonText: { fontSize: 14, color: colors.accentGreen },
        completeButtonTextDone: { fontSize: 14, color: colors.textDisabled },
        deleteButtonText: { fontSize: 14, color: colors.accentRed }
    });
}