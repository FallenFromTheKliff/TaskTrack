import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeModalBaseStyles, makeCardBaseStyles } from '@/styles/shared/common';
import { MAX_WIDTH } from '@/styles/shared/tokens';

export function makeTaskDetailsStyles(colors: ThemeColors, activeIconColor?: string | null) {
    const modal = makeModalBaseStyles(colors);
    const card = makeCardBaseStyles(colors);
    const ic = activeIconColor ?? colors.accentBlue;
    return StyleSheet.create({
        overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
        blur: modal.blur,
        wrapper: { width: '100%', maxWidth: MAX_WIDTH, paddingHorizontal: 16 },
        panel: { ...modal.panel, maxHeight: '96%', overflow: 'hidden' },
        panelHeader: { ...modal.panelHeader, gap: 12 },
        statusIcon: card.iconBadge,
        panelTitle: { flex: 1, fontSize: 18, color: colors.textPrimary },
        scrollContent: { padding: 16, gap: 12 },
        detailBox: card.detailBox,
        detailRowGroup: { flexDirection: 'row', gap: 8 },
        flex: { flex: 1 },
        detailLabel: card.detailLabel,
        detailValue: { ...card.detailValue, color: ic },
        detailValueDue: { ...card.detailValue, color: colors.accentGold },
        descriptionBox: { ...card.detailBox, padding: 10, gap: 6 },
        descriptionValue: { ...card.detailValue, color: ic, minHeight: 50 },
        notesBox: { ...card.detailBox, padding: 10, gap: 6 },
        notesValue: { ...card.detailValue, color: ic, fontStyle: 'italic' },
        detailValueEmpty: { ...card.detailValue, fontStyle: 'italic', color: colors.textDisabled },
        deletionValue: { ...card.detailValue, color: colors.accentRed },
        panelFooter: modal.panelFooter
    });
}