import { View, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from '@expo/vector-icons';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: 8 },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: C.bgInput,
        borderRadius: R.md,
        paddingVertical: 14,
        paddingHorizontal: 8,
        borderWidth: 2,
        borderColor: C.borderStrong
    },
    buttonActive: { backgroundColor: C.bgInputDark, borderColor: C.accentBlue },
    buttonDisabled: { backgroundColor: C.bgInputDark, borderColor: C.borderSub },
    label: { fontSize: 14, color: C.textMuted },
    labelActive: { color: C.textPrimary },
    labelDisabled: { color: C.textDisabled }
});

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
    const handlePress = (label: string) => {
        if (!isEditable) return;
        onSelect(label);
    };
    return (
        <View style={styles.row}>
            {GENDER_OPTIONS.map(({ label, icon }) => {
                const isActive = value === label;
                return (
                    <Pressable
                        key={label}
                        style={[
                            styles.button,
                            isActive && styles.buttonActive,
                            !isEditable && styles.buttonDisabled
                        ]}
                        onPress={() => handlePress(label)}
                        disabled={!isEditable}
                    >
                        <Ionicons
                            name={icon}
                            size={16}
                            color={!isEditable ? C.textDisabled : isActive ? C.textPrimary : C.textMuted}
                        />
                        <PlayerText style={[
                            styles.label,
                            isActive && styles.labelActive,
                            !isEditable && styles.labelDisabled
                        ]}>
                            {label}
                        </PlayerText>
                    </Pressable>
                );
            })}
        </View>
    );
}