import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeCardBaseStyles } from '@/styles/shared/common';
import { R } from '@/styles/shared/tokens';

export function makeRecordCardStyles(colors: ThemeColors, activeIconColor?: string | null) {
    const base = makeCardBaseStyles(colors);
    const ic = activeIconColor ?? colors.accentBlue;
    return StyleSheet.create({
        card: { ...base.card, marginBottom: 12 },
        cardHeader: base.cardHeader,
        statusIcon: base.iconBadge,
        cardInfo: base.cardInfo,
        cardTitle: base.cardTitle,
        cardMeta: base.cardMeta,
        statusText: { fontSize: 13 },
        chevron: { padding: 4 },
        divider: base.divider,
        cardBody: { ...base.cardBody, gap: 10 },
        descriptionBlock: { gap: 4 },
        descriptionLabel: base.detailLabel,
        descriptionBox: { ...base.detailBox, padding: 10 },
        descriptionText: { ...base.detailValue, color: ic },
        detailBox: base.detailBox,
        detailRow: { flexDirection: 'row', gap: 8 },
        detailRowGroup: { flexDirection: 'row', gap: 8 },
        flex: { flex: 1 },
        detailLabel: base.detailLabel,
        detailValue: { ...base.detailValue, color: ic },
        cardActions: { flexDirection: 'row', gap: 8 },
        trashActions: { flexDirection: 'row', gap: 8 },
        detailsButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            paddingVertical: 10,
            borderRadius: R.md,
            borderWidth: 1,
            borderColor: colors.borderMid,
            backgroundColor: colors.bgInputDark
        },
        detailsButtonText: { fontSize: 14, color: activeIconColor ?? colors.textMuted },
        restoreButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            paddingVertical: 10,
            borderRadius: R.md,
            borderWidth: 1,
            borderColor: colors.accentGold,
            backgroundColor: colors.bgDeep
        },
        restoreButtonText: { fontSize: 14, color: colors.accentGold },
        deleteButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            paddingVertical: 10,
            borderRadius: R.md,
            borderWidth: 1,
            borderColor: colors.accentRedLightBorder,
            backgroundColor: colors.accentRedLight
        },
        deleteButtonText: { fontSize: 14, color: colors.accentRed }
    });
}