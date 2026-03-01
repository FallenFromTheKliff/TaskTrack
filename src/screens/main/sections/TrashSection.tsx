import { useState, useMemo } from 'react';
import { View, ScrollView, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTask } from '@/contexts/TaskContext';
import { useHistory, HistoryEvent } from '@/contexts/HistoryContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useFilteredHistory } from '@/hooks/main/sections/useFilteredHistory';
import { useFabScroll } from '@/hooks/main/sections/useFabScroll';
import { useSelectionMode } from '@/hooks/main/sections/useSelectionMode';
import { useEntranceAnim } from '@/hooks/animations/useEntranceAnim';
import { useBulkAction } from '@/hooks/main/useBulkAction';
import { makeSectionStyles } from '@/styles/components/main/SectionStyles';

import RecordCard from '@/components/cards/RecordCard';
import SearchFilter from '@/components/layout/SearchFilter';
import NoContent from '@/components/main/NoContent';
import SelectionFooter from '@/components/main/SelectionFooter';
import SelectableCardRow from '@/components/main/SelectableCardRow';
import ConfirmModal from '@/components/modals/ConfirmModal';

export default function TrashSection() {
    const { history, permanentlyDeleteEvent } = useHistory();
    const { restoreTaskFromTrash } = useTask();
    const { colors, activeIconColor } = useTheme();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');

    const { selectionMode, selectedIds, enterSelectionMode, exitSelectionMode, toggleSelect } = useSelectionMode();
    const { fabAnim, handleScroll } = useFabScroll();
    const { translateY, opacity } = useEntranceAnim();
    const styles = makeSectionStyles(colors, activeIconColor);

    const trashedEvents: HistoryEvent[] = useMemo(() =>
            history.filter(e => e.status === 'trashed' || e.status === 'unfinished'),
        [history]
    );
    const { filtered } = useFilteredHistory({
        events: trashedEvents,
        searchQuery,
        selectedDate,
        selectedEndDate,
        selectedStatus
    });

    const selectedCount = selectedIds.size;
    const handleBulkDelete = async () => {
        for (const id of selectedIds) await permanentlyDeleteEvent(id);
        exitSelectionMode();
    };
    const bulkAction = useBulkAction(handleBulkDelete);

    return (
        <View style={[styles.content, { flex: 1, position: 'relative' }]}>
            <SearchFilter
                variant="trash"
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedEndDate={selectedEndDate}
                onEndDateChange={setSelectedEndDate}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
            />
            <Animated.View style={{ flex: 1, transform: [{ translateY }], opacity }}>
                <ScrollView
                    style={styles.taskListScrollView}
                    contentContainerStyle={[styles.taskListContent, { paddingBottom: 100 }]}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {filtered.length === 0 && (
                        <NoContent
                            icon="trash-outline"
                            title={trashedEvents.length === 0 ? 'Trash is Empty' : 'No Results'}
                            subtitle={trashedEvents.length === 0 ? 'Deleted and unfinished tasks will appear here.' : 'No trash items match your search.'}
                        />
                    )}
                    {filtered.map(event => (
                        <SelectableCardRow
                            key={event.id}
                            id={event.id}
                            selectionMode={selectionMode}
                            isSelected={selectedIds.has(event.id)}
                            onToggle={toggleSelect}
                        >
                            <RecordCard
                                event={event}
                                statusOverride={event.status === 'unfinished' ? 'Unfinished' : 'Pending Deletion'}
                                selectionMode={selectionMode}
                                onRestore={restoreTaskFromTrash}
                                onDelete={permanentlyDeleteEvent}
                            />
                        </SelectableCardRow>
                    ))}
                </ScrollView>
            </Animated.View>
            {selectionMode ? (
                <SelectionFooter
                    selectedCount={selectedCount}
                    actionLabel="DELETE"
                    onCancel={exitSelectionMode}
                    onAction={bulkAction.open}
                />
            ) : (
                <Animated.View style={[styles.fabContainer, { opacity: fabAnim }]}>
                    <Pressable style={[styles.fab, { backgroundColor: activeIconColor ?? colors.accentBlue }]} onPress={enterSelectionMode}>
                        <Ionicons name="trash-outline" size={32} color={colors.bgDeep} />
                    </Pressable>
                </Animated.View>
            )}
            <ConfirmModal
                isVisible={bulkAction.isVisible}
                title="Delete Permanently?"
                message={`Permanently delete ${selectedCount} item${selectedCount !== 1 ? 's' : ''}? This cannot be undone.`}
                yesLabel="Delete"
                noLabel="Cancel"
                yesIcon="trash-outline"
                yesDestructive
                onNo={bulkAction.close}
                onYes={bulkAction.confirm}
            />
        </View>
    );
}