import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeSelectionFooterStyles(colors: ThemeColors, isActive: boolean) {
    return StyleSheet.create({
        footerRow: { flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20 },
        cancelButton: {
            flex: 1,
            backgroundColor: colors.bgInputDark,
            paddingVertical: 14,
            borderRadius: R.xl,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.borderMid
        },
        cancelText: { fontSize: 16, color: colors.textMuted },
        deleteButton: {
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 14,
            borderRadius: R.xl,
            borderWidth: 2,
            gap: 8,
            backgroundColor: isActive ? colors.accentRedLight : colors.bgDivider,
            borderColor: isActive ? colors.accentRedLightBorder : colors.borderSub
        },
        deleteText: {
            fontSize: 16,
            color: isActive ? colors.accentRed : colors.textDisabled
        }
    });
}