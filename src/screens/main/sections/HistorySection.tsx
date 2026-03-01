import { useState } from 'react';
import { View, ScrollView, Animated } from 'react-native';

import { PlayerText } from '@/components/fields/PlayerText';
import { useHistory } from '@/contexts/HistoryContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useEntranceAnim } from '@/hooks/animations/useEntranceAnim';
import { useFilteredHistory } from '@/hooks/main/sections/useFilteredHistory';
import { formatDateShort } from '@/utils/shared/dateUtils';
import { makeSectionStyles } from '@/styles/components/main/SectionStyles';
import { makeGroupStyles } from '@/styles/cards/GroupStyles';

import RecordCard from '@/components/cards/RecordCard';
import SearchFilter from '@/components/layout/SearchFilter';
import NoContent from '@/components/main/NoContent';

export default function HistorySection() {
    const { history } = useHistory();
    const { colors } = useTheme();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');

    const { translateY, opacity } = useEntranceAnim();
    const styles = makeSectionStyles(colors);
    const groupStyles = makeGroupStyles(colors);

    const historyEvents = history.filter(e => e.status !== 'trashed');
    const { filtered, grouped, showGroups } = useFilteredHistory({
        events: historyEvents,
        searchQuery,
        selectedDate,
        selectedEndDate,
        selectedStatus,
        searchFields: ['title', 'description', 'status'],
        withGroups: true
    });

    return (
        <View style={styles.content}>
            <SearchFilter
                variant="history"
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
                    contentContainerStyle={[styles.taskListContent, { paddingBottom: 40 }]}
                    showsVerticalScrollIndicator={false}
                >
                    {filtered.length === 0 && (
                        <NoContent
                            icon="time-outline"
                            title={historyEvents.length === 0 ? 'No History Yet' : 'No Results'}
                            subtitle={historyEvents.length === 0 ? 'Completed, edited, deleted, and unfinished tasks will appear here.' : 'No history events match your search.'}
                        />
                    )}
                    {showGroups ? (
                        grouped.map(([dateKey, events]) => (
                            <View key={dateKey} style={groupStyles.group}>
                                <View style={groupStyles.groupLabelRow}>
                                    <PlayerText style={groupStyles.groupLabel}>{formatDateShort(dateKey)}</PlayerText>
                                </View>
                                {events.map(event => (
                                    <RecordCard key={event.id} event={event} />
                                ))}
                            </View>
                        ))
                    ) : (
                        filtered.map(event => (
                            <RecordCard key={event.id} event={event} />
                        ))
                    )}
                </ScrollView>
            </Animated.View>
        </View>
    );
}