import { ReactNode } from "react";
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '@/styles/main/SectionStyles';

type SelectableCardRowProps = {
    id: string;
    selectionMode: boolean;
    isSelected: boolean;
    onToggle: (id: string) => void;
    children: ReactNode;
};

export default function SelectableCardRow({ id, selectionMode, isSelected, onToggle, children }: SelectableCardRowProps) {
    return (
        <View style={styles.trashCardRow}>
            {selectionMode && (
                <Pressable style={styles.trashCheckboxArea} onPress={() => onToggle(id)}>
                    <View style={[styles.trashCheckbox, isSelected && styles.trashCheckboxSelected]}>
                        {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                </Pressable>
            )}
            <View style={styles.trashCardContent}>
                {children}
            </View>
        </View>
    );
}