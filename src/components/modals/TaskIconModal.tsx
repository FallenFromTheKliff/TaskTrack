import { View, Pressable, Animated, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/forms/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { useOverlayAnim } from '@/hooks/animations/useOverlayAnim';
import { TASK_ICONS, PRIORITY_COLORS, PRIORITY_BG, PRIORITY_BORDER } from '@/utils/shared/constantUtils';
import { makeTaskIconStyles } from '@/styles/components/modals/TaskIconStyles';

export const formatIconName = (icon: string) =>
    icon.replace('-outline', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

type TaskIconModalProps = {
    isVisible: boolean;
    selectedIcon: string;
    priority: 'low' | 'medium' | 'high';
    onSelect: (icon: string) => void;
    onClose: () => void;
};

export default function TaskIconModal({ isVisible, selectedIcon, priority, onSelect, onClose }: TaskIconModalProps) {
    const { colors } = useTheme();
    const styles = makeTaskIconStyles(colors);
    const { opacity, scale } = useOverlayAnim(isVisible);
    const color = PRIORITY_COLORS[priority];
    const bg = PRIORITY_BG[priority];
    const border = PRIORITY_BORDER[priority];
    return (
        <Modal visible={isVisible} transparent>
            <Animated.View style={[styles.backdrop, { opacity }]}>
                <Animated.View style={[styles.panel, { transform: [{ scale }] }]}>
                    <View style={styles.header}>
                        <PlayerText style={styles.title}>Task Icon Menu</PlayerText>
                    </View>
                    <FlatList
                        data={TASK_ICONS}
                        keyExtractor={(item) => item}
                        numColumns={6}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.grid}
                        renderItem={({ item }) => {
                            const isSelected = selectedIcon === item;
                            return (
                                <Pressable
                                    style={[styles.cell, isSelected && { borderColor: border, backgroundColor: bg }]}
                                    onPress={() => { onSelect(item); onClose(); }}
                                >
                                    <Ionicons name={item as any} size={22} color={isSelected ? color : colors.textMuted} />
                                    <PlayerText style={[styles.cellLabel, isSelected && { color }]}>
                                        {formatIconName(item)}
                                    </PlayerText>
                                </Pressable>
                            );
                        }}
                    />
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}