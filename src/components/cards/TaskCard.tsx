import { useState } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from '@expo/vector-icons';
import { useTask, Task } from '@/contexts/TaskContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatDateShort } from '@/utils/shared/dateUtils';
import { useExpandCard } from '@/hooks/cards/useExpandCard';
import { PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_BG, PRIORITY_BORDER } from '@/utils/shared/constantUtils';

import ConfirmModal from '@/components/modals/ConfirmModal';
import styles from '@/styles/cards/TaskCardStyles';

type TaskCardProps = {
    task: Task;
    navigation: NativeStackNavigationProp<any>;
    selectionMode?: boolean;
    isSelected?: boolean;
    onSelectToggle?: (id: string) => void;
};

export default function TaskCard({ task, navigation, selectionMode = false, isSelected = false, onSelectToggle }: TaskCardProps) {
    const { toggleTaskCompletion, moveTaskToTrash } = useTask();
    const { bodyHeight, setBodyHeight, handleToggleExpand, chevronRotation, bodyHeightAnim, bodyOpacityAnim } = useExpandCard();
    const [markDoneVisible, setMarkDoneVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);
    const priorityTextStyle = [
        styles.cardPriority,
        task.priority === 'low' && styles.cardPriorityLow,
        task.priority === 'medium' && styles.cardPriorityMedium,
        task.priority === 'high' && styles.cardPriorityHigh
    ];
    const handleComplete = async () => { await toggleTaskCompletion(task.id); };
    const handleEdit = () => { navigation.navigate('Task Details', { task }); };
    const handleDelete = async () => { await moveTaskToTrash(task.id); };
    const startDateDisplay = formatDateShort(task.date);
    const dueDateDisplay = task.duration.type === 'timed' && task.duration.endDate ? formatDateShort(task.duration.endDate) : 'Anytime';
    const taskIcon = task.icon ?? 'checkbox-outline';
    const iconBg = { backgroundColor: PRIORITY_BG[task.priority], borderColor: PRIORITY_BORDER[task.priority] };
    const iconColor = PRIORITY_COLORS[task.priority];
    const borderColor = PRIORITY_BORDER[task.priority];
    return (
        <View style={styles.cardRow}>
            {selectionMode && (
                <Pressable style={styles.checkboxArea} onPress={() => onSelectToggle?.(task.id)}>
                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                </Pressable>
            )}
            <View style={[styles.card, { borderColor }, selectionMode && styles.cardShifted]}>
                <View style={styles.cardDateRange}>
                    <PlayerText style={styles.cardDateRangeText}>
                        {startDateDisplay} → {dueDateDisplay}
                    </PlayerText>
                </View>
                <Pressable style={styles.cardHeader} onPress={selectionMode ? () => onSelectToggle?.(task.id) : handleToggleExpand}>
                    <View style={[styles.priorityIcon, iconBg]}>
                        <Ionicons name={taskIcon as any} size={20} color={iconColor} />
                    </View>
                    <View style={styles.cardInfo}>
                        <PlayerText style={[styles.cardTitle, task.completed && styles.completedTitle]}>
                            {task.title}
                        </PlayerText>
                        <View style={styles.cardMeta}>
                            <PlayerText style={priorityTextStyle}>
                                Task Priority: {PRIORITY_LABELS[task.priority]}
                            </PlayerText>
                        </View>
                    </View>
                    <Animated.View style={[styles.chevron, { transform: [{ rotate: chevronRotation }] }]}>
                        {!selectionMode && <Ionicons name="chevron-down" size={20} color="#6D8196" />}
                    </Animated.View>
                </Pressable>
                {!selectionMode && (
                    <Animated.View style={{
                        maxHeight: bodyHeightAnim.interpolate({ inputRange: [0, 1], outputRange: [0, bodyHeight || 500] }),
                        opacity: bodyOpacityAnim,
                        overflow: 'hidden'
                    }}>
                        <View onLayout={(e) => { const h = e.nativeEvent.layout.height; if (h > 0) setBodyHeight(h); }}>
                            <View style={styles.divider} />
                            <View style={styles.cardBody}>
                                <View style={styles.descriptionContainer}>
                                    <PlayerText style={styles.descriptionLabel}>Description</PlayerText>
                                    <PlayerText style={styles.descriptionText}>
                                        {task.description || 'No description provided.'}
                                    </PlayerText>
                                </View>
                                <View style={styles.notesContainer}>
                                    <PlayerText style={styles.notesLabel}>Notes</PlayerText>
                                    <PlayerText style={styles.notesText}>
                                        {task.notes && task.notes.trim().length > 0 ? task.notes.trim() : 'None'}
                                    </PlayerText>
                                </View>
                                <View style={styles.cardActions}>
                                    <Pressable
                                        style={[styles.actionButton, task.completed ? styles.completeButtonDone : styles.completeButton]}
                                        onPress={() => {
                                            if (!task.completed) setMarkDoneVisible(true);
                                            else handleComplete();
                                        }}
                                    >
                                        <Ionicons
                                            name={task.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
                                            size={16}
                                            color={task.completed ? '#8AE0A8' : '#6DC48A'}
                                        />
                                        <PlayerText style={[styles.actionButtonText, task.completed ? styles.completeButtonTextDone : styles.completeButtonText]}>
                                            {task.completed ? 'Completed' : 'Mark Done'}
                                        </PlayerText>
                                    </Pressable>
                                    <Pressable style={[styles.actionButton, styles.editButton]} onPress={handleEdit}>
                                        <Ionicons name="pencil-outline" size={16} color="#8EA7C1" />
                                        <PlayerText style={styles.actionButtonText}>Edit</PlayerText>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.actionButton, styles.deleteButton]}
                                        onPress={() => setRemoveVisible(true)}
                                    >
                                        <Ionicons name="trash-outline" size={16} color="#C47A7A" />
                                        <PlayerText style={[styles.actionButtonText, styles.deleteButtonText]}>Remove</PlayerText>
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