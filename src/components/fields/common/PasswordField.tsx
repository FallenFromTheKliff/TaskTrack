import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/forms/PlayerText';
import { useTheme, ThemeColors } from '@/contexts/ThemeContext';
import { makeFieldLabel } from '@/styles/shared/common';
import { R } from '@/styles/shared/tokens';

function makePasswordFieldStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        fieldBlock: { marginBottom: 16 },
        fieldLabel: makeFieldLabel(colors, activeIconColor),
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
        passwordButtonTextDisabled: { color: colors.textDisabled }
    });
}

type PasswordFieldProps = {
    isEditing: boolean;
    onPress: () => void;
};

export default function PasswordField({ isEditing, onPress }: PasswordFieldProps) {
    const { colors, activeIconColor } = useTheme();
    const s = makePasswordFieldStyles(colors, activeIconColor);
    const ic = activeIconColor ?? colors.accentBlue;
    const icMuted = activeIconColor ?? colors.textMuted;
    return (
        <View style={[s.fieldBlock, { zIndex: 1 }]}>
            <PlayerText style={[s.fieldLabel, !isEditing && { color: colors.textDisabled }]}>Password</PlayerText>
            <Pressable
                style={[s.passwordButton, !isEditing && s.passwordButtonDisabled]}
                onPress={() => { if (isEditing) onPress(); }}
            >
                <Ionicons name="lock-closed-outline" size={20} color={isEditing ? ic : colors.textDisabled} style={{ marginRight: 10 }} />
                <PlayerText style={[s.passwordButtonText, !isEditing && s.passwordButtonTextDisabled]}>
                    {isEditing ? 'Change Password...' : '••••••••'}
                </PlayerText>
                {isEditing && <Ionicons name="chevron-forward" size={16} color={icMuted} style={{ marginLeft: 'auto' }} />}
            </Pressable>
        </View>
    );
}