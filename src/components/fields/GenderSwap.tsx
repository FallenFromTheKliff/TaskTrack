import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

type GenderSwapProps = {
    value: string;
    isEditable: boolean;
    onSelect: (val: string) => void;
};

const GENDER_OPTIONS: { label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { label: 'Male', icon: 'male-outline' },
    { label: 'Female', icon: 'female-outline' },
    { label: 'Other', icon: 'male-female-outline' }
];

export default function GenderSwap({ value, isEditable, onSelect }: GenderSwapProps) {
    const { colors, activeIconColor } = useTheme();

    const s = StyleSheet.create({
        row: { flexDirection: 'row', gap: 8 },
        button: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            backgroundColor: colors.bgInput,
            borderRadius: R.md,
            paddingVertical: 14,
            paddingHorizontal: 8,
            borderWidth: 2,
            borderColor: colors.borderStrong
        },
        buttonActive: { backgroundColor: colors.bgInputDark, borderColor: activeIconColor ?? colors.accentBlue },
        buttonDisabled: { backgroundColor: colors.bgInputDark, borderColor: colors.borderSub },
        label: { fontSize: 14, color: colors.textMuted },
        labelActive: { color: colors.textPrimary },
        labelDisabled: { color: colors.textDisabled }
    });

    return (
        <View style={s.row}>
            {GENDER_OPTIONS.map(({ label, icon }) => {
                const isActive = value === label;
                return (
                    <Pressable
                        key={label}
                        style={[s.button, isActive && s.buttonActive, !isEditable && s.buttonDisabled]}
                        onPress={() => { if (isEditable) onSelect(label); }}
                        disabled={!isEditable}
                    >
                        <Ionicons
                            name={icon}
                            size={16}
                            color={!isEditable ? colors.textDisabled : isActive ? colors.textPrimary : colors.textMuted}
                        />
                        <PlayerText style={[s.label, isActive && s.labelActive, !isEditable && s.labelDisabled]}>
                            {label}
                        </PlayerText>
                    </Pressable>
                );
            })}
        </View>
    );
}