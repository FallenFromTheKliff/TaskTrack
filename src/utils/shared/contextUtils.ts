export { getTodayString as getLocalDateString } from '@/utils/shared/dateUtils';

export const generateId = (prefix: string): string =>
    `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

export const TASKS_STORAGE_KEY = '@tasktrack_tasks';
export const HISTORY_STORAGE_KEY = '@tasktrack_history';