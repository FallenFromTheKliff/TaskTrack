import { ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from './AuthContext';
import { generateId, getLocalDateString } from '@/utils/shared/contextUtils';
import { Task } from './TaskContext';

export type HistoryEventType = 'created' | 'edited' | 'completed' | 'deleted' | 'unfinished' | 'trashed';
export type HistoryEvent = {
    id: string;
    taskId: string;
    userId: string;
    title: string;
    description: string;
    notes?: string;
    icon?: string;
    priority?: 'low' | 'medium' | 'high';
    endDate?: string;
    status: HistoryEventType;
    createdAt: string;
    updatedAt: string;
};

type HistoryContextType = {
    history: HistoryEvent[];
    addHistoryEvent: (task: Task, status: HistoryEventType) => Promise<void>;
    deleteHistoryEvent: (eventId: string) => Promise<void>;
    permanentlyDeleteEvent: (eventId: string) => Promise<void>;
    restoreTaskFromTrash: (eventId: string, onRestore: (task: Task) => Promise<void>) => Promise<void>;
    reconcileUnfinished: (allTasks: Task[], today: string, now: string) => Promise<{ remainingTasks: Task[] }>;
    clearAllHistory: () => Promise<void>;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);
const HISTORY_STORAGE_KEY = '@tasktrack_history';
const TRASH_RETENTION_DAYS = 30;

const isOlderThanDays = (isoString: string, days: number): boolean => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return new Date(isoString) < cutoff;
};

const taskToHistoryEvent = (task: Task, status: HistoryEventType, now: string): HistoryEvent => ({
    id: generateId('hist'),
    taskId: task.id,
    userId: task.userId,
    title: task.title,
    description: task.description,
    notes: task.notes,
    icon: task.icon,
    priority: task.priority,
    endDate: task.duration.type === 'timed' ? task.duration.endDate : undefined,
    status,
    createdAt: task.createdAt,
    updatedAt: now
});

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [history, setHistory] = useState<HistoryEvent[]>([]);

    useEffect(() => {
        if (!user) setHistory([]);
    }, [user]);

    const saveHistory = useCallback(async (updated: HistoryEvent[]) => {
        if (!user) return;
        await AsyncStorage.setItem(`${HISTORY_STORAGE_KEY}_${user.id}`, JSON.stringify(updated));
        setHistory(updated);
    }, [user]);

    const addHistoryEvent = useCallback(async (task: Task, status: HistoryEventType) => {
        const now = new Date().toISOString();
        await saveHistory([taskToHistoryEvent(task, status, now), ...history]);
    }, [history, saveHistory]);

    const deleteHistoryEvent = useCallback(async (eventId: string) => {
        await saveHistory(history.filter(e => e.id !== eventId));
    }, [history, saveHistory]);

    const permanentlyDeleteEvent = useCallback(async (eventId: string) => {
        const event = history.find(e => e.id === eventId);
        if (!event) return;
        const now = new Date().toISOString();
        const deletedRecord: HistoryEvent = { ...event, id: generateId('hist'), status: 'deleted', updatedAt: now };
        await saveHistory([deletedRecord, ...history.filter(e => e.id !== eventId)]);
    }, [history, saveHistory]);

    const restoreTaskFromTrash = useCallback(async (eventId: string, onRestore: (task: Task) => Promise<void>) => {
        if (!user) throw new Error('User must be logged in');
        const event = history.find(e => e.id === eventId);
        if (!event) return;
        const restoredTask: Task = {
            id: generateId('task'),
            userId: user.id,
            title: event.title,
            description: event.description,
            notes: event.notes,
            icon: event.icon,
            date: getLocalDateString(),
            completed: false,
            priority: event.priority ?? 'low',
            duration: event.endDate ? { type: 'timed', endDate: event.endDate } : { type: 'indefinite' },
            createdAt: event.createdAt,
            updatedAt: new Date().toISOString()
        };
        await onRestore(restoredTask);
        await saveHistory(history.filter(e => e.id !== eventId));
    }, [user, history, saveHistory]);

    const reconcileUnfinished = useCallback(async (allTasks: Task[], today: string, now: string) => {
        if (!user) return { remainingTasks: allTasks };
        const stored = await AsyncStorage.getItem(`${HISTORY_STORAGE_KEY}_${user.id}`);
        const allHistory: HistoryEvent[] = stored ? JSON.parse(stored) : [];
        const alreadyRecorded = new Set(allHistory.filter(e => e.status === 'unfinished').map(e => e.taskId));
        const unfinished: Task[] = [];
        const remaining: Task[] = [];
        for (const task of allTasks) {
            const overdue =
                task.date < today ||
                (task.duration.type === 'timed' && task.duration.endDate && task.duration.endDate < today);
            if (!task.completed && overdue) unfinished.push(task);
            else remaining.push(task);
        }
        const newEvents = unfinished
            .filter(t => !alreadyRecorded.has(t.id))
            .map(t => taskToHistoryEvent(t, 'unfinished', now));
        const purged = [...newEvents, ...allHistory].filter(e =>
            (e.status === 'trashed' || e.status === 'unfinished')
                ? !isOlderThanDays(e.updatedAt, TRASH_RETENTION_DAYS)
                : true
        );
        await AsyncStorage.setItem(`${HISTORY_STORAGE_KEY}_${user.id}`, JSON.stringify(purged));
        setHistory(purged);
        return { remainingTasks: remaining };
    }, [user]);

    const clearAllHistory = useCallback(async () => {
        if (!user) return;
        await AsyncStorage.setItem(`${HISTORY_STORAGE_KEY}_${user.id}`, JSON.stringify([]));
        setHistory([]);
    }, [user]);

    return (
        <HistoryContext.Provider value={{ history, addHistoryEvent, deleteHistoryEvent, permanentlyDeleteEvent, restoreTaskFromTrash, reconcileUnfinished, clearAllHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const ctx = useContext(HistoryContext);
    if (!ctx) throw new Error('useHistory must be used within HistoryProvider');
    return ctx;
};