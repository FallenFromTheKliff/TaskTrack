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
        editingButtons: { flexDirection: 'row', gap: 10 }
    });
}