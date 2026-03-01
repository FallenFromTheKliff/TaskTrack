import { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { makeBirthdayDropdownStyles } from '@/styles/components/fields/BirthdayDropdownStyles';

type BirthdayDropdownProps = {
    label: string;
    value: string;
    options: string[];
    isEditable: boolean;
    onSelect: (val: string) => void;
};

export default function BirthdayDropdown({ label, value, options, isEditable, onSelect }: BirthdayDropdownProps) {
    const { colors, activeIconColor } = useTheme();
    const [open, setOpen] = useState(false);
    const s = makeBirthdayDropdownStyles(colors, activeIconColor);

    const handlePress = () => { if (isEditable) setOpen(prev => !prev); };
    const handleSelect = (opt: string) => { onSelect(opt); setOpen(false); };

    return (
        <View style={[s.wrapper, open && { zIndex: 9999, elevation: 9999 }]}>
            <Pressable style={[s.button, !isEditable && s.buttonDisabled]} onPress={handlePress}>
                <PlayerText style={[s.value, !value && s.placeholder, !isEditable && s.valueDisabled]}>
                    {value || label}
                </PlayerText>
                {isEditable && (
                    <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={14} color={activeIconColor ?? colors.textMuted} />
                )}
            </Pressable>
            {open && isEditable && (
                <View style={s.list}>
                    <ScrollView style={s.listScroll} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                        {options.map(opt => (
                            <Pressable
                                key={opt}
                                style={[s.item, opt === value && s.itemActive]}
                                onPress={() => handleSelect(opt)}
                            >
                                <PlayerText style={[s.itemText, opt === value && s.itemTextActive]}>
                                    {opt}
                                </PlayerText>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}