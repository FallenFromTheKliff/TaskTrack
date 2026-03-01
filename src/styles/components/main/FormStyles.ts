import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { R, MAX_WIDTH } from '@/styles/shared/tokens';

export function makeFormStyles(colors: ThemeColors, isEditing: boolean, disabled: boolean, activeIconColor?: string | null) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bgDeep,
            maxWidth: MAX_WIDTH,
            alignSelf: 'center',
            width: '100%'
        },
        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 30,
            paddingBottom: 15,
            backgroundColor: colors.bgPanel,
            borderBottomWidth: 2,
            borderBottomColor: colors.borderSub,
            gap: 12
        },
        backButton: { padding: 4 },
        screenTitle: { fontSize: 22, color: colors.textPrimary },
        scrollArea: { flex: 1 },
        footer: {
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: colors.bgDeep,
            borderTopWidth: 2,
            borderTopColor: colors.borderSub
        },
        submitButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: disabled ? colors.bgDivider : isEditing ? colors.bgInputDark : colors.greenBg,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: disabled ? colors.borderSub : isEditing ? colors.borderMid : colors.greenBorder,
            paddingVertical: 15,
            gap: 8
        },
        submitText: {
            fontSize: 22,
            color: disabled ? colors.textDisabled : isEditing ? (activeIconColor ?? colors.accentBlue) : colors.accentGreen
        }
    });
}