import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlayerText } from '@/components/fields/PlayerText';

import styles from '@/styles/main/SectionStyles';

type SelectionFooterProps = {
    selectedCount: number;
    actionLabel: string;
    onCancel: () => void;
    onAction: () => void;
};

export default function SelectionFooter({ selectedCount, actionLabel, onCancel, onAction }: SelectionFooterProps) {
    return (
        <View style={styles.trashFooterRow}>
            <Pressable style={styles.trashCancelButton} onPress={onCancel}>
                <PlayerText style={styles.trashCancelText}>Cancel</PlayerText>
            </Pressable>
            <Pressable
                style={[styles.trashDeleteButton, selectedCount === 0 && styles.trashDeleteButtonDisabled]}
                onPress={selectedCount > 0 ? onAction : undefined}
                disabled={selectedCount === 0}
            >
                <Ionicons name="trash-outline" size={18} color={selectedCount > 0 ? '#FFCCCB' : '#6D8196'} />
                <PlayerText style={[styles.trashDeleteText, selectedCount === 0 && styles.trashDeleteTextDisabled]}>
                    {actionLabel} ({selectedCount})
                </PlayerText>
            </Pressable>
        </View>
    );
}