import { View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import PlayerButton from '@/components/fields/PlayerButton';

type SelectionFooterProps = {
    selectedCount: number;
    actionLabel: string;
    onCancel: () => void;
    onAction: () => void;
};

export default function SelectionFooter({ selectedCount, actionLabel, onCancel, onAction }: SelectionFooterProps) {
    const { colors } = useTheme();
    return (
        <View style={{ flexDirection: 'row', gap: 10, padding: 14, borderTopWidth: 2, borderTopColor: colors.borderSub, backgroundColor: colors.bgDeep }}>
            <PlayerButton variant="ghost" label="Cancel" onPress={onCancel} flex={1} />
            <PlayerButton
                variant="danger"
                label={`${actionLabel} (${selectedCount})`}
                onPress={selectedCount > 0 ? onAction : () => {}}
                icon="trash-outline"
                disabled={selectedCount === 0}
                flex={2}
            />
        </View>
    );
}