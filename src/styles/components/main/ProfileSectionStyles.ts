import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeCameraBadge, makeFieldLabel } from '@/styles/shared/common';
import { R } from '@/styles/shared/tokens';

export function makeProfileSectionStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        container: { flex: 1 },
        scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
        avatarSection: { alignItems: 'center', marginBottom: 20 },
        avatarWrapper: { position: 'relative' },
        avatar: { width: 100, height: 100, borderRadius: 20, borderWidth: 3, borderColor: colors.borderMid },
        avatarBomb: makeCameraBadge(colors, activeIconColor),
        photoActionRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
        photoActionButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: colors.bgPanel,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.borderSub,
            paddingVertical: 8,
            paddingHorizontal: 12
        },
        photoActionText: { fontSize: 13, color: activeIconColor ?? colors.accentBlue },
        form: { gap: 0 },
        fieldBlock: { marginBottom: 16 },
        fieldLabel: makeFieldLabel(colors, activeIconColor),
        fieldLabelDisabled: { ...makeFieldLabel(colors, activeIconColor), color: colors.textDisabled },
        birthdayRow: { flexDirection: 'row', gap: 8, marginBottom: 4, zIndex: 100 },
        passwordButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgInput,
            borderRadius: R.md,
            paddingHorizontal: 15,
            paddingVertical: 14,
            borderWidth: 2,
            borderColor: colors.borderStrong,
            marginBottom: 16
        },
        passwordButtonDisabled: { backgroundColor: colors.bgInputDark, borderColor: colors.borderSub },
        passwordButtonText: { fontSize: 18, color: activeIconColor ?? colors.accentBlue },
        passwordButtonTextDisabled: { color: colors.textDisabled },
        actionBar: { marginTop: 8, gap: 8 },
        editButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.greenBg,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.greenBorder,
            paddingVertical: 12,
            gap: 8
        },
        editButtonText: { fontSize: 18, color: colors.accentGreen },
        terminateButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.accentRedLight,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.accentRedLightBorder,
            paddingVertical: 12,
            gap: 8
        },
        terminateButtonText: { fontSize: 18, color: colors.accentRed },
        editingButtons: { flexDirection: 'row', gap: 10 },
        cancelButton: {
            flex: 1,
            backgroundColor: colors.bgInputDark,
            paddingVertical: 12,
            borderRadius: R.md,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.borderMid
        },
        cancelButtonText: { fontSize: 18, color: colors.textMuted },
        saveButton: {
            flex: 2,
            backgroundColor: colors.greenBg,
            paddingVertical: 12,
            borderRadius: R.md,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.greenBorder
        },
        saveButtonLoading: { backgroundColor: colors.bgDivider, borderColor: colors.borderSub },
        saveButtonText: { fontSize: 18, color: colors.accentGreen },
        successText: { fontSize: 14, color: colors.accentGreen, textAlign: 'center' },
        errorText: { fontSize: 14, color: colors.errorRed, textAlign: 'center' }
    });
}