import { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { makeSettingsDropdownStyles } from '@/styles/components/fields/SettingsDropdownStyles';

type SettingsDropdownProps = {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onSelect: (val: string) => void;
};

export default function SettingsDropdown({ label, value, options, onSelect }: SettingsDropdownProps) {
    const { colors, activeIconColor } = useTheme();
    const [open, setOpen] = useState(false);
    const s = makeSettingsDropdownStyles(colors, activeIconColor);
    const selectedLabel = options.find(o => o.value === value)?.label ?? value;
    const ic = activeIconColor ?? colors.textMuted;

    return (
        <View style={[s.wrapper, open && { zIndex: 9999, elevation: 9999 }]}>
            <PlayerText style={s.fieldLabel}>{label}</PlayerText>
            <Pressable style={s.button} onPress={() => setOpen(prev => !prev)}>
                <PlayerText style={s.valueText}>{selectedLabel}</PlayerText>
                <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color={ic} />
            </Pressable>
            {open && (
                <View style={s.list}>
                    <ScrollView style={s.listScroll} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                        {options.map(opt => {
                            const isActive = opt.value === value;
                            return (
                                <Pressable
                                    key={opt.value}
                                    style={[s.item, isActive && { backgroundColor: colors.bgDivider }]}
                                    onPress={() => { onSelect(opt.value); setOpen(false); }}
                                >
                                    <PlayerText style={[s.itemText, { color: isActive ? colors.textPrimary : (activeIconColor ?? colors.accentBlue) }]}>
                                        {opt.label}
                                    </PlayerText>
                                    {isActive && <Ionicons name="checkmark" size={16} color={ic} />}
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}