import { StyleSheet } from 'react-native';
import { modalBlur } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

export const SIDEBAR_WIDTH = 320;

const styles = StyleSheet.create({
    modalOuter: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
    modalInner: { flex: 1, width: '100%', maxWidth: 450, position: 'relative', overflow: 'hidden' },
    backdrop: modalBlur,
    sidebar: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: C.bgPanel,
        borderRightWidth: 2,
        borderRightColor: C.borderSub,
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
        borderBottomColor: C.borderSub
    },
    logoText: { fontSize: 36, marginLeft: 10 },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.bgDeep,
        borderRadius: R.lg,
        borderWidth: 1,
        borderColor: C.borderSub,
        padding: 12,
        gap: 12,
        marginBottom: 20
    },
    profileCardActive: { borderColor: '#5B7FA6', borderWidth: 2, backgroundColor: '#1A2535' },
    profilePicture: { width: 46, height: 46, borderRadius: R.xl, borderWidth: 2, borderColor: C.borderMid },
    profileInfo: { flex: 1, gap: 3 },
    profileUsername: { fontSize: 18, color: C.textPrimary },
    profileEmail: { fontSize: 12, color: C.textDisabled },
    profileEditHint: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
        backgroundColor: C.bgPanel,
        borderRadius: R.sm,
        borderWidth: 1,
        borderColor: C.borderSub,
        paddingVertical: 4,
        paddingHorizontal: 7,
        alignSelf: 'flex-start'
    },
    profileEditHintText: { fontSize: 11, color: C.accentBlue },
    navItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderRadius: R.lg, marginBottom: 4, gap: 14 },
    navItemActive: { backgroundColor: C.bgDivider },
    navText: { fontSize: 20, color: C.textMuted },
    navTextActive: { color: C.textPrimary },
    bottomSection: { marginTop: 'auto', borderTopWidth: 2, borderTopColor: C.borderSub, paddingTop: 20 },
    logoutItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: R.lg,
        gap: 14,
        borderWidth: 2,
        borderColor: C.accentRedBg
    },
    logoutText: { fontSize: 20, color: C.accentRed }
});

export default styles;