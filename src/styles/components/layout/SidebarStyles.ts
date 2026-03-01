import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/contexts/ThemeContext';
import { makeModalBaseStyles } from '@/styles/shared/common';
import { R, MAX_WIDTH } from '@/styles/shared/tokens';

export const SIDEBAR_WIDTH = 320;

export function makeSidebarStyles(colors: ThemeColors) {
    const modal = makeModalBaseStyles(colors);
    return StyleSheet.create({
        modalOuter: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
        modalInner: { flex: 1, width: '100%', maxWidth: MAX_WIDTH, position: 'relative', overflow: 'hidden' },
        backdrop: modal.blur,
        backdropTap: { flex: 1 },
        sidebar: {
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: SIDEBAR_WIDTH,
            backgroundColor: colors.bgPanel,
            borderRightWidth: 2,
            borderRightColor: colors.borderSub,
            paddingTop: 40,
            paddingHorizontal: 20,
            paddingBottom: 24
        },
        logoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            paddingBottom: 20,
            borderBottomWidth: 2,
            borderBottomColor: colors.borderSub
        },
        logoText: { fontSize: 36, marginLeft: 10, color: colors.textPrimary },
        profileCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgDeep,
            borderRadius: R.lg,
            borderWidth: 1,
            borderColor: colors.borderSub,
            padding: 12,
            gap: 12,
            marginBottom: 20
        },
        profileCardActive: { borderWidth: 2, backgroundColor: colors.bgInputDark },
        profilePicture: { width: 46, height: 46, borderRadius: R.xl, borderWidth: 2, borderColor: colors.borderMid },
        profileInfo: { flex: 1, gap: 3 },
        profileUsername: { fontSize: 18, color: colors.textPrimary },
        profileEmail: { fontSize: 14, color: colors.textDisabled },
        profileEditHint: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginTop: 4,
            backgroundColor: colors.bgPanel,
            borderRadius: R.sm,
            borderWidth: 1,
            borderColor: colors.borderSub,
            paddingVertical: 4,
            paddingHorizontal: 7,
            alignSelf: 'flex-start'
        },
        profileEditHintText: { fontSize: 11, color: colors.accentBlue },
        navItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: R.lg,
            marginBottom: 4,
            gap: 14
        },
        navItemActive: { backgroundColor: colors.bgDivider },
        navText: { fontSize: 20, color: colors.textMuted },
        navTextActive: { color: colors.textPrimary },
        bottomSection: {
            marginTop: 'auto',
            borderTopWidth: 2,
            borderTopColor: colors.borderSub,
            paddingTop: 20
        },
        logoutItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: R.lg,
            gap: 14,
            borderWidth: 2,
            borderColor: colors.accentRedBg
        },
        logoutText: { fontSize: 20, color: colors.accentRed }
    });
}