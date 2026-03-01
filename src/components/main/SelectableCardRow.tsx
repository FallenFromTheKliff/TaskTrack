import { ReactNode } from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';
import { makeSelectableCardRowStyles } from '@/styles/components/content/SelectableCardRowStyles';

type SelectableCardRowProps = {
    id: string;
    selectionMode: boolean;
    isSelected: boolean;
    onToggle: (id: string) => void;
    children: ReactNode;
};

export default function SelectableCardRow({ id, selectionMode, isSelected, onToggle, children }: SelectableCardRowProps) {
    const { colors } = useTheme();
    const s = makeSelectableCardRowStyles(colors, isSelected);
    return (
        <View style={s.row}>
            {selectionMode && (
                <Pressable style={s.checkboxArea} onPress={() => onToggle(id)}>
                    <View style={s.checkbox}>
                        {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                </Pressable>
            )}
            <View style={s.content}>{children}</View>
        </View>
    );
}