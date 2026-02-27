import { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from '@expo/vector-icons';

import styles from '@/styles/components/BirthdayDropdownStyles';

type BirthdayDropdownProps = {
    label: string;
    value: string;
    options: string[];
    isEditable: boolean;
    onSelect: (val: string) => void;
};

export default function BirthdayDropdown({ label, value, options, isEditable, onSelect }: BirthdayDropdownProps) {
    const [open, setOpen] = useState(false);

    const handlePress = () => {
        if (isEditable) setOpen(prev => !prev);
    };

    const handleSelect = (opt: string) => {
        onSelect(opt);
        setOpen(false);
    };

    return (
        <View style={[styles.wrapper, open && { zIndex: 9999, elevation: 9999 }]}>
            <Pressable style={[styles.button, !isEditable && styles.buttonDisabled]} onPress={handlePress}>
                <PlayerText style={[
                    styles.value,
                    !value && styles.placeholder,
                    !isEditable && styles.valueDisabled
                ]}>
                    {value || label}
                </PlayerText>
                {isEditable && (
                    <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={14} color="#6D8196" />
                )}
            </Pressable>

            {open && isEditable && (
                <View style={styles.list}>
                    <ScrollView style={styles.listScroll} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                        {options.map(opt => (
                            <Pressable
                                key={opt}
                                style={[styles.item, opt === value && styles.itemActive]}
                                onPress={() => handleSelect(opt)}
                            >
                                <PlayerText style={[styles.itemText, opt === value && styles.itemTextActive]}>
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