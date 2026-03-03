import { useMemo } from 'react';

import { HistoryEvent } from '@/contexts/HistoryContext';
import { filterByQuery, groupByKey, sortGroupsDesc } from '@/utils/shared/filterUtils';

type UseFilteredHistoryOptions = {
    events: HistoryEvent[];
    searchQuery: string;
    selectedDate: string;
    selectedEndDate: string;
    selectedStatus?: string;
    searchFields?: string[];
    withGroups?: boolean;
};

export function useFilteredHistory({
    events,
    searchQuery,
    selectedDate,
    selectedEndDate,
    selectedStatus,
    searchFields = ['title', 'description'],
    withGroups = false
}: UseFilteredHistoryOptions) {
    const filtered = useMemo(() => {
        let result = events;
        if (selectedStatus) result = result.filter(e => e.status === selectedStatus);
        if (selectedDate && selectedEndDate) {
            result = result.filter(e => {
                const d = e.updatedAt.slice(0, 10);
                return d >= selectedDate && d <= selectedEndDate;
            });
        } else if (selectedDate) {
            result = result.filter(e => e.updatedAt.slice(0, 10) === selectedDate);
        }
        return filterByQuery<HistoryEvent>(result, searchQuery, searchFields as (keyof HistoryEvent)[]);
    }, [events, searchQuery, selectedDate, selectedEndDate, selectedStatus, searchFields]);

    const { grouped, showGroups } = useMemo(() => {
        if (!withGroups) return { grouped: [] as [string, HistoryEvent[]][], showGroups: false };
        const grouped = sortGroupsDesc(groupByKey(filtered, e => e.updatedAt.slice(0, 10)));
        const isRangeMode = !!(selectedDate && selectedEndDate);
        const isAllDatesMode = !selectedDate;
        const showGroups = (isAllDatesMode && grouped.length > 1) || isRangeMode;
        return { grouped, showGroups };
    }, [filtered, withGroups, selectedDate, selectedEndDate]);

    return { filtered, grouped, showGroups };
}