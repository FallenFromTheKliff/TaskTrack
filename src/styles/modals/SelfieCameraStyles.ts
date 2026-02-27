import { StyleSheet } from 'react-native';

import { modalBlur, modalPanel, cancelButton, cancelText, primaryButton, primaryButtonText } from '@/styles/shared/common';
import { C, R, MAX_WIDTH } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
    blur: modalBlur,
    container: { ...modalPanel, width: '100%', maxWidth: MAX_WIDTH, overflow: 'hidden', alignSelf: 'center', marginHorizontal: 20 },
    viewfinder: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: C.bgDeep,
        borderBottomWidth: 2,
        borderBottomColor: C.borderSub,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    camera: { flex: 1 },
    frozenPreview: { flex: 1, resizeMode: 'cover' },
    errorBar: { paddingHorizontal: 16, paddingTop: 10 },
    errorText: { fontSize: 13, color: C.errorRed, textAlign: 'center' },
    actions: { flexDirection: 'column', gap: 12, padding: 16 },
    cancelButton: { ...cancelButton, flexDirection: 'row', justifyContent: 'center' },
    cancelText: cancelText,
    captureButton: { ...primaryButton },
    captureButtonSaving: { backgroundColor: C.borderStrong, borderColor: C.borderStrong },
    captureText: { ...primaryButtonText, fontSize: 20 },
    permissionBox: {
        alignItems: 'center',
        gap: 16,
        padding: 32,
        ...modalPanel,
        marginHorizontal: 20,
        width: '100%',
        maxWidth: MAX_WIDTH
    },
    permissionText: { fontSize: 16, color: C.textMuted, textAlign: 'center' },
    permissionButton: {
        backgroundColor: C.accentBlue,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.textPrimary
    },
    permissionButtonText: { fontSize: 18, color: C.bgDeep },
    permissionCancel: {
        backgroundColor: C.bgDivider,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderMid
    },
    permissionCancelText: { fontSize: 18, color: C.accentBlue }
});

export default styles;