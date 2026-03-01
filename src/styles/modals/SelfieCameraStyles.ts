import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeModalBaseStyles } from '@/styles/shared/common';
import { R, MAX_WIDTH } from '@/styles/shared/tokens';

export function makeSelfieCameraStyles(colors: ThemeColors) {
    const modal = makeModalBaseStyles(colors);
    return StyleSheet.create({
        overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
        blur: modal.blur,
        container: { ...modal.panel, width: '100%', maxWidth: MAX_WIDTH, overflow: 'hidden', marginHorizontal: 20 },
        viewfinder: {
            width: '100%',
            aspectRatio: 1,
            backgroundColor: colors.bgDeep,
            borderBottomWidth: 2,
            borderBottomColor: colors.borderSub,
            overflow: 'hidden'
        },
        camera: { flex: 1 },
        frozenPreview: { flex: 1, resizeMode: 'cover' },
        errorBar: { paddingHorizontal: 16, paddingTop: 10 },
        errorText: { fontSize: 13, color: colors.errorRed, textAlign: 'center' },
        actions: { flexDirection: 'column', gap: 12, padding: 16 },
        cancelButton: { ...modal.cancelButton, flexDirection: 'row', justifyContent: 'center' },
        cancelText: modal.cancelText,
        captureButton: modal.confirmButton,
        captureButtonSaving: {
            ...modal.confirmButton,
            backgroundColor: colors.bgDivider,
            borderColor: colors.borderSub
        },
        captureText: { ...modal.confirmText, fontSize: 20 },
        permissionBox: {
            ...modal.panel,
            alignItems: 'center',
            gap: 16,
            padding: 32,
            marginHorizontal: 20,
            width: '100%',
            maxWidth: MAX_WIDTH
        },
        permissionText: { fontSize: 16, color: colors.textMuted, textAlign: 'center' },
        permissionButton: {
            backgroundColor: colors.greenBg,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.greenBorder
        },
        permissionButtonText: { fontSize: 18, color: colors.accentGreen },
        permissionCancel: {
            backgroundColor: colors.bgInputDark,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.borderMid
        },
        permissionCancelText: { fontSize: 18, color: colors.textMuted }
    });
}