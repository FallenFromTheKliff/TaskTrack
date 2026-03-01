import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { makeSelectionFooterStyles } from '@/styles/components/content/SelectionFooterStyles';

type SelectionFooterProps = {
    selectedCount: number;
    actionLabel: string;
    onCancel: () => void;
    onAction: () => void;
};

export default function SelectionFooter({ selectedCount, actionLabel, onCancel, onAction }: SelectionFooterProps) {
    const { colors } = useTheme();
    const s = makeSelectionFooterStyles(colors, selectedCount > 0);
    return (
        <View style={s.footerRow}>
            <Pressable style={s.cancelButton} onPress={onCancel}>
                <PlayerText style={s.cancelText}>Cancel</PlayerText>
            </Pressable>
            <Pressable
                style={s.deleteButton}
                onPress={selectedCount > 0 ? onAction : undefined}
                disabled={selectedCount === 0}
            >
                <Ionicons name="trash-outline" size={18} color={selectedCount > 0 ? '#FFCCCB' : colors.textDisabled} />
                <PlayerText style={s.deleteText}>{actionLabel} ({selectedCount})</PlayerText>
            </Pressable>
        </View>
    );
}