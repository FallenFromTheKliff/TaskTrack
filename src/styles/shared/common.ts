import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { R, MAX_WIDTH } from './tokens';

export function makeScreenContainer(colors: ThemeColors) {
    return {
        flex: 1 as const,
        backgroundColor: colors.bgDeep,
        maxWidth: MAX_WIDTH,
        alignSelf: 'center' as const,
        width: '100%' as const
    };
}

export function makeFieldLabel(colors: ThemeColors, activeIconColor?: string | null) {
    return {
        fontSize: 18 as const,
        color: activeIconColor ?? colors.accentBlue,
        marginBottom: 6,
        marginLeft: 4
    };
}

export function makeCameraBadge(colors: ThemeColors, activeIconColor?: string | null) {
    return {
        position: 'absolute' as const,
        bottom: 0,
        right: 0,
        backgroundColor: activeIconColor ?? colors.accentBlue,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        borderWidth: 2,
        borderColor: colors.borderSub
    };
}

export function makeModalBaseStyles(colors: ThemeColors) {
    return StyleSheet.create({
        overlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent'
        },
        blur: {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: colors.overlay88
        },
        panel: {
            backgroundColor: colors.bgPanel,
            borderRadius: R.xl,
            borderWidth: 2,
            borderColor: colors.borderSub
        },
        panelHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderBottomWidth: 2,
            borderBottomColor: colors.borderSub
        },
        panelFooter: {
            flexDirection: 'row',
            gap: 12,
            padding: 16,
            borderTopWidth: 2,
            borderTopColor: colors.borderSub
        }
    });
}

export function makeCardBaseStyles(colors: ThemeColors) {
    return StyleSheet.create({
        card: {
            backgroundColor: colors.cardBg,
            borderRadius: R.lg,
            borderWidth: 2,
            borderColor: colors.cardBorder,
            overflow: 'hidden'
        },
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingVertical: 14,
            gap: 12
        },
        iconBadge: {
            width: 36,
            height: 36,
            borderRadius: R.md,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        cardInfo: { flex: 1, gap: 3 },
        cardTitle: { fontSize: 18, color: colors.textPrimary },
        cardMeta: { flexDirection: 'row', alignItems: 'center' },
        divider: { height: 2, backgroundColor: colors.borderSub, marginHorizontal: 14 },
        cardBody: { paddingHorizontal: 14, paddingBottom: 14, paddingTop: 12 },
        detailBox: {
            backgroundColor: colors.bgDeep,
            borderRadius: R.md,
            borderWidth: 1,
            borderColor: colors.borderSub,
            padding: 10
        },
        detailLabel: { fontSize: 12, color: colors.textMuted },
        detailValue: { fontSize: 15, color: colors.accentBlue, lineHeight: 22 }
    });
}