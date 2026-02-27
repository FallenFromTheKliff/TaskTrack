import { useState, useMemo } from 'react';
import { View, ScrollView, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PlayerText } from '@/components/fields/PlayerText';
import { Task, useTask } from '@/contexts/TaskContext';
import { formatDateShort } from '@/utils/shared/dateUtils';
import { filterByQuery, groupByKey, sortGroupsAsc } from '@/utils/shared/filterUtils';
import { useFabScroll } from '@/hooks/main/sections/useFabScroll';
import { useSelectionMode } from '@/hooks/main/sections/useSelectionMode';
import { useToggleAnim } from '@/hooks/animations/useToggleAnim';
import { useEntranceAnim } from '@/hooks/animations/useEntranceAnim';
import { useBulkAction } from '@/hooks/main/useBulkAction';

import SearchFilter from '@/components/main/layout/SearchFilter';
import TaskCard from '@/components/cards/TaskCard';
import NoContent from '@/components/main/sections/NoContent';
import SelectionFooter from '@/components/main/sections/SelectionFooter';
import ConfirmModal from '@/components/modals/ConfirmModal';
import styles from '@/styles/main/SectionStyles';
import groupStyles from '@/styles/cards/GroupStyles';

type TaskSectionProps = {
    navigation: NativeStackNavigationProp<any>;
};

export default function TaskSection({ navigation }: TaskSectionProps) {
    const { tasks, getTasksByDate, getTasksInRange, moveTaskToTrash } = useTask();
    const [searchQuery, setSearchQuery] = useState('');
    const [taskDisplayCount, setTaskDisplayCount] = useState(-1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');

    const { selectionMode, selectedIds, enterSelectionMode, exitSelectionMode, toggleSelect } = useSelectionMode();
    const { fabAnim, handleScroll } = useFabScroll();
    const { translateY, opacity } = useEntranceAnim();
    const { anim: fabToggleAnim, isOpen: isFabOpen, toggle: toggleFab } = useToggleAnim({ duration: 250, closeDuration: 150 });
    const fabRotation = fabToggleAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '135deg'] });
    const btnSlide = fabToggleAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -88] });
    const btn2Slide = fabToggleAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -148] });

    const closeFab = () => { if (isFabOpen) toggleFab(false); };
    const handleEnterSelectionMode = () => { closeFab(); enterSelectionMode(); };
    const handleMoveToTrash = async () => {
        for (const id of selectedIds) await moveTaskToTrash(id);
        exitSelectionMode();
    };

    const bulkAction = useBulkAction(handleMoveToTrash);
    const selectedCount = selectedIds.size;
    const allDatesMode = selectedDate === '';

    const { filteredTasks, grouped, showGroups } = useMemo(() => {
        let pool: Task[];
        if (allDatesMode) pool = tasks.filter(t => !t.completed);
        else if (selectedEndDate) pool = getTasksInRange(selectedDate, selectedEndDate).filter(t => !t.completed);
        else pool = getTasksByDate(selectedDate).filter(t => !t.completed);
        let result = selectedPriority ? pool.filter(t => t.priority === selectedPriority) : pool;
        result = filterByQuery(result, searchQuery, ['title', 'description']);
        if (taskDisplayCount > 0) result = result.slice(0, taskDisplayCount);
        const wantsGroups = allDatesMode || (!!selectedEndDate && selectedEndDate !== selectedDate);
        const grouped = wantsGroups ? sortGroupsAsc(groupByKey(result, t => t.date)) : [];
        const showGroups = wantsGroups && grouped.length > 1;
        return { filteredTasks: result, grouped, showGroups };
    }, [tasks, getTasksByDate, getTasksInRange, selectedDate, selectedEndDate, selectedPriority, searchQuery, taskDisplayCount]);
    const noTasks = filteredTasks.length === 0;

    return (
        <View style={[styles.content, { flex: 1 }]}>
            <SearchFilter
                variant="tasks"
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedEndDate={selectedEndDate}
                onEndDateChange={setSelectedEndDate}
                taskDisplayCount={taskDisplayCount}
                onDisplayCountChange={setTaskDisplayCount}
                selectedPriority={selectedPriority}
                onPriorityChange={setSelectedPriority}
            />
            <Animated.View style={{ flex: 1, transform: [{ translateY }], opacity }}>
                <ScrollView
                    style={styles.taskListScrollView}
                    contentContainerStyle={[styles.taskListContent, { paddingBottom: 100 }]}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    onTouchStart={() => { if (!selectionMode) closeFab(); }}
                >
                    {noTasks && (
                        <NoContent
                            icon="clipboard-outline"
                            title="No Tasks Yet"
                            subtitle="Add a task to get started for this day!"
                        />
                    )}
                    {!noTasks && showGroups ? (
                        grouped.map(([dateKey, dateTasks]) => (
                            <View key={dateKey} style={groupStyles.group}>
                                <View style={groupStyles.groupLabelRow}>
                                    <PlayerText style={groupStyles.groupLabel}>{formatDateShort(dateKey)}</PlayerText>
                                </View>
                                {dateTasks.map(task => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        navigation={navigation}
                                        selectionMode={selectionMode}
                                        isSelected={selectedIds.has(task.id)}
                                        onSelectToggle={toggleSelect}
                                    />
                                ))}
                            </View>
                        ))
                    ) : (
                        !noTasks && filteredTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                navigation={navigation}
                                selectionMode={selectionMode}
                                isSelected={selectedIds.has(task.id)}
                                onSelectToggle={toggleSelect}
                            />
                        ))
                    )}
                </ScrollView>
            </Animated.View>
            {!selectionMode && (
                <Animated.View style={[styles.fabContainer, { opacity: fabAnim }]}>
                    <Animated.View style={[styles.fabAction, { transform: [{ translateY: btn2Slide }], opacity: fabToggleAnim }]}>
                        <Pressable style={styles.fabActionButton} onPress={handleEnterSelectionMode}>
                            <Ionicons name="trash-outline" size={24} color="#C47A7A" />
                            <PlayerText style={styles.fabActionTextRemove}>Move to Trash</PlayerText>
                        </Pressable>
                    </Animated.View>
                    <Animated.View style={[styles.fabAction, { transform: [{ translateY: btnSlide }], opacity: fabToggleAnim }]}>
                        <Pressable style={styles.fabActionButton} onPress={() => { closeFab(); navigation.navigate('Task Details'); }}>
                            <Ionicons name="add-circle-outline" size={24} color="#6DC48A" />
                            <PlayerText style={styles.fabActionTextCreate}>Create New Task</PlayerText>
                        </Pressable>
                    </Animated.View>
                    <Pressable style={styles.fab} onPress={() => toggleFab()}>
                        <Animated.View style={{ transform: [{ rotate: fabRotation }] }}>
                            <Ionicons name="add" size={48} color="#313B46" />
                        </Animated.View>
                    </Pressable>
                </Animated.View>
            )}
            {selectionMode && (
                <SelectionFooter
                    selectedCount={selectedCount}
                    actionLabel="MOVE TO TRASH BIN"
                    onCancel={exitSelectionMode}
                    onAction={bulkAction.open}
                />
            )}
            <ConfirmModal
                isVisible={bulkAction.isVisible}
                title="Move to Trash?"
                message={`Move ${selectedCount} task${selectedCount !== 1 ? 's' : ''} to the Trash Bin?`}
                yesLabel="Move to Trash"
                noLabel="Cancel"
                yesIcon="trash-outline"
                yesDestructive
                onNo={bulkAction.close}
                onYes={bulkAction.confirm}
            />
        </View>
    );
}