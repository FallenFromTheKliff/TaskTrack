import { ReactNode, createContext, useContext, useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from './AuthContext';
import { useHistory } from './HistoryContext';
import { generateId, getLocalDateString } from '@/utils/shared/contextUtils';

export type Task = {
    id: string;
    userId: string;
    title: string;
    description: string;
    notes?: string;
    icon?: string;
    date: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    duration: {
        type: 'indefinite' | 'timed';
        endDate?: string;
        endTime?: string;
    };
    createdAt: string;
    updatedAt: string;
};

type TaskContextType = {
    tasks: Task[];
    getTasksByDate: (date: string) => Task[];
    getTasksInRange: (startDate: string, endDate: string) => Task[];
    createTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateTask: (taskId: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => Promise<void>;
    moveTaskToTrash: (taskId: string) => Promise<void>;
    toggleTaskCompletion: (taskId: string) => Promise<void>;
    recordEditEvent: (task: Task) => Promise<void>;
    restoreTaskFromTrash: (eventId: string) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);
const TASKS_STORAGE_KEY = '@tasktrack_tasks';

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const { addHistoryEvent, reconcileUnfinished, restoreTaskFromTrash: restoreFromHistory } = useHistory();
    const [tasks, setTasks] = useState<Task[]>([]);
    const lastReconcileDate = useRef<string>('');

    useEffect(() => {
        if (user) loadAndReconcile();
        else { setTasks([]); lastReconcileDate.current = ''; }
    }, [user]);

    useEffect(() => {
        const handler = (nextState: AppStateStatus) => {
            if (nextState === 'active' && user) {
                const today = getLocalDateString();
                if (today !== lastReconcileDate.current) loadAndReconcile();
            }
        };
        const sub = AppState.addEventListener('change', handler);
        return () => sub.remove();
    }, [user]);

    const loadAndReconcile = async () => {
        if (!user) return;
        try {
            const stored = await AsyncStorage.getItem(`${TASKS_STORAGE_KEY}_${user.id}`);
            const allTasks: Task[] = stored ? JSON.parse(stored) : [];
            const today = getLocalDateString();
            lastReconcileDate.current = today;
            const { remainingTasks } = await reconcileUnfinished(allTasks, today, new Date().toISOString());
            await AsyncStorage.setItem(`${TASKS_STORAGE_KEY}_${user.id}`, JSON.stringify(remainingTasks));
            setTasks(remainingTasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
            setTasks([]);
        }
    };

    const saveTasks = async (updated: Task[]) => {
        if (!user) return;
        await AsyncStorage.setItem(`${TASKS_STORAGE_KEY}_${user.id}`, JSON.stringify(updated));
        setTasks(updated);
    };

    const getTasksByDate = (date: string) => tasks.filter(t => t.date === date);
    const getTasksInRange = (startDate: string, endDate: string) =>
        tasks.filter(t => t.date >= startDate && t.date <= endDate);

    const createTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
        if (!user) throw new Error('User must be logged in');
        const now = new Date().toISOString();
        const newTask: Task = { ...taskData, id: generateId('task'), userId: user.id, createdAt: now, updatedAt: now };
        await saveTasks([...tasks, newTask]);
        await addHistoryEvent(newTask, 'created');
    };

    const updateTask = async (taskId: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => {
        if (!user) throw new Error('User must be logged in');
        await saveTasks(tasks.map(t => t.id === taskId ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t));
    };

    const moveTaskToTrash = async (taskId: string) => {
        if (!user) throw new Error('User must be logged in');
        const task = tasks.find(t => t.id === taskId);
        if (task) await addHistoryEvent(task, 'trashed');
        await saveTasks(tasks.filter(t => t.id !== taskId));
    };

    const toggleTaskCompletion = async (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        const nowCompleted = !task.completed;
        await updateTask(taskId, { completed: nowCompleted });
        if (nowCompleted) {
            await addHistoryEvent({ ...task, completed: true, updatedAt: new Date().toISOString() }, 'completed');
        }
    };

    const recordEditEvent = async (task: Task) => {
        await addHistoryEvent(task, 'edited');
    };

    const restoreTaskFromTrash = async (eventId: string) => {
        await restoreFromHistory(eventId, async (restoredTask) => {
            await saveTasks([...tasks, restoredTask]);
        });
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            getTasksByDate,
            getTasksInRange,
            createTask,
            updateTask,
            moveTaskToTrash,
            toggleTaskCompletion,
            recordEditEvent,
            restoreTaskFromTrash,
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error('useTask must be used within TaskProvider');
    return ctx;
};