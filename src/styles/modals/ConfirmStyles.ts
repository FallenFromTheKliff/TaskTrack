import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeConfirmStyles(colors: ThemeColors, yesDestructive: boolean, yesPositive: boolean) {
    return StyleSheet.create({
        modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
        modalBlur: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.overlay88 },
        container: {
            backgroundColor: colors.bgPanel,
            borderRadius: R.xl,
            borderWidth: 2,
            borderColor: colors.borderSub,
            width: '85%',
            maxWidth: 400,
            padding: 24,
            gap: 8
        },
        title: { fontSize: 26, color: colors.textPrimary, marginBottom: 4 },
        message: { fontSize: 16, color: colors.textMuted, lineHeight: 24, marginBottom: 8 },
        actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
        noButton: {
            flex: 1,
            backgroundColor: colors.bgInputDark,
            paddingVertical: 14,
            borderRadius: R.md,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.borderMid
        },
        noText: { fontSize: 18, color: colors.textMuted },
        yesButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: yesDestructive ? colors.accentRedLight : yesPositive ? colors.greenBg : colors.greenBg,
            paddingVertical: 14,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: yesDestructive ? colors.accentRedLightBorder : yesPositive ? colors.greenBorder : colors.greenBorder,
            gap: 8
        },
        yesText: {
            fontSize: 18,
            color: yesDestructive ? colors.accentRed : yesPositive ? colors.accentGreen : colors.accentGreen
        }
    });
}