import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeModalBaseStyles } from '@/styles/shared/common';
import { R } from '@/styles/shared/tokens';

export function makeTaskIconStyles(colors: ThemeColors) {
    const modal = makeModalBaseStyles(colors);
    return StyleSheet.create({
        backdrop: {
            flex: 1,
            backgroundColor: colors.overlay92,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20
        },
        panel: { ...modal.panel, width: '100%', maxWidth: 420, overflow: 'hidden' },
        header: { ...modal.panelHeader, justifyContent: 'center' },
        title: { fontSize: 28, color: colors.textPrimary },
        grid: { padding: 10 },
        cell: {
            flex: 1,
            aspectRatio: 0.85,
            margin: 4,
            borderRadius: R.md,
            borderWidth: 1,
            borderColor: colors.borderSub,
            backgroundColor: colors.bgDeep,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            paddingVertical: 6
        },
        cellLabel: { fontSize: 9, color: colors.textDisabled, textAlign: 'center' }
    });
}