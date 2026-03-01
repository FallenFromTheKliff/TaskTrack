import { useState } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { useTask, Task } from '@/contexts/TaskContext';
import { formatDateShort } from '@/utils/shared/dateUtils';
import { useExpandCard } from '@/hooks/cards/useExpandCard';
import { PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_BG, PRIORITY_BORDER } from '@/utils/shared/constantUtils';
import { makeTaskCardStyles } from '@/styles/cards/TaskCardStyles';

import ConfirmModal from '@/components/modals/ConfirmModal';

type TaskCardProps = {
    task: Task;
    navigation: NativeStackNavigationProp<any>;
    selectionMode?: boolean;
    isSelected?: boolean;
    onSelectToggle?: (id: string) => void;
};

export default function TaskCard({ task, navigation, selectionMode = false, isSelected = false, onSelectToggle }: TaskCardProps) {
    const { colors, activeIconColor } = useTheme();
    const { toggleTaskCompletion, moveTaskToTrash } = useTask();
    const { bodyHeight, setBodyHeight, handleToggleExpand, chevronRotation, bodyHeightAnim, bodyOpacityAnim } = useExpandCard();
    const [markDoneVisible, setMarkDoneVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);

    const handleComplete = async () => { await toggleTaskCompletion(task.id); };
    const handleEdit = () => { navigation.navigate('Task Details', { task }); };
    const handleDelete = async () => { await moveTaskToTrash(task.id); };

    const startDateDisplay = formatDateShort(task.date);
    const dueDateDisplay = task.duration.type === 'timed' && task.duration.endDate ? formatDateShort(task.duration.endDate) : 'Anytime';

    const taskIcon = task.icon ?? 'checkbox-outline';
    const iconBg = { backgroundColor: PRIORITY_BG[task.priority], borderColor: PRIORITY_BORDER[task.priority] };
    const iconColor = PRIORITY_COLORS[task.priority];
    const borderColor = PRIORITY_BORDER[task.priority];
    const s = makeTaskCardStyles(colors, activeIconColor);
    const ic = activeIconColor ?? colors.textMuted;

    return (
        <View style={s.cardRow}>
            {selectionMode && (
                <Pressable style={s.checkboxArea} onPress={() => onSelectToggle?.(task.id)}>
                    <View style={[s.checkbox, isSelected && s.checkboxSelected]}>
                        {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                </Pressable>
            )}
            <View style={[s.card, { borderColor }, selectionMode && s.cardShifted]}>
                <View style={s.cardDateRange}>
                    <PlayerText style={s.cardDateRangeText}>
                        {startDateDisplay} → {dueDateDisplay}
                    </PlayerText>
                </View>
                <Pressable
                    style={s.cardHeader}
                    onPress={selectionMode ? () => onSelectToggle?.(task.id) : handleToggleExpand}
                >
                    <View style={[s.priorityIcon, iconBg]}>
                        <Ionicons name={taskIcon as any} size={20} color={iconColor} />
                    </View>
                    <View style={s.cardInfo}>
                        <PlayerText style={[s.cardTitle, task.completed && s.completedTitle]}>
                            {task.title}
                        </PlayerText>
                        <View style={s.cardMeta}>
                            <PlayerText style={[s.cardPriority, { color: PRIORITY_COLORS[task.priority] }]}>
                                Task Priority: {PRIORITY_LABELS[task.priority]}
                            </PlayerText>
                        </View>
                    </View>
                    <Animated.View style={[s.chevron, { transform: [{ rotate: chevronRotation }] }]}>
                        {!selectionMode && <Ionicons name="chevron-down" size={20} color={ic} />}
                    </Animated.View>
                </Pressable>
                {!selectionMode && (
                    <Animated.View style={{
                        maxHeight: bodyHeightAnim.interpolate({ inputRange: [0, 1], outputRange: [0, bodyHeight || 500] }),
                        opacity: bodyOpacityAnim,
                        overflow: 'hidden'
                    }}>
                        <View onLayout={e => { const h = e.nativeEvent.layout.height; if (h > 0) setBodyHeight(h); }}>
                            <View style={s.divider} />
                            <View style={s.cardBody}>
                                <View style={s.descriptionContainer}>
                                    <PlayerText style={s.descriptionLabel}>Description</PlayerText>
                                    <PlayerText style={s.descriptionText}>
                                        {task.description || 'No description provided.'}
                                    </PlayerText>
                                </View>
                                <View style={s.notesContainer}>
                                    <PlayerText style={s.notesLabel}>Notes</PlayerText>
                                    <PlayerText style={s.notesText}>
                                        {task.notes?.trim() || 'None'}
                                    </PlayerText>
                                </View>
                                <View style={s.cardActions}>
                                    <Pressable
                                        style={[s.actionButton, task.completed ? s.completeButtonDone : s.completeButton]}
                                        onPress={() => { if (!task.completed) setMarkDoneVisible(true); else handleComplete(); }}
                                    >
                                        <Ionicons
                                            name={task.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
                                            size={16}
                                            color={task.completed ? colors.textDisabled : colors.accentGreen}
                                        />
                                        <PlayerText style={[s.actionButtonText, task.completed ? s.completeButtonTextDone : s.completeButtonText]}>
                                            {task.completed ? 'Completed' : 'Mark Done'}
                                        </PlayerText>
                                    </Pressable>
                                    <Pressable style={[s.actionButton, s.editButton]} onPress={handleEdit}>
                                        <Ionicons name="pencil-outline" size={16} color={ic} />
                                        <PlayerText style={s.actionButtonText}>Edit</PlayerText>
                                    </Pressable>
                                    <Pressable style={[s.actionButton, s.deleteButton]} onPress={() => setRemoveVisible(true)}>
                                        <Ionicons name="trash-outline" size={16} color={colors.accentRed} />
                                        <PlayerText style={[s.actionButtonText, s.deleteButtonText]}>Remove</PlayerText>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                )}
            </View>
            <ConfirmModal
                isVisible={markDoneVisible}
                title="Mark as Complete?"
                message={`"${task.title}" will be marked as complete and recorded in your history.`}
                yesLabel="Complete"
                noLabel="Cancel"
                yesIcon="checkmark-circle-outline"
                yesPositive
                onNo={() => setMarkDoneVisible(false)}
                onYes={() => { setMarkDoneVisible(false); handleComplete(); }}
            />
            <ConfirmModal
                isVisible={removeVisible}
                title="Move to Trash?"
                message={`"${task.title}" will be moved to the Trash. You have 30 days to restore it before it's permanently deleted.`}
                yesLabel="Move to Trash"
                noLabel="Cancel"
                yesIcon="trash-outline"
                yesDestructive
                onNo={() => setRemoveVisible(false)}
                onYes={() => { setRemoveVisible(false); handleDelete(); }}
            />
        </View>
    );
}