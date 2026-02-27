export const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTH_NAMES_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
export const YEARS = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i));

export const getTodayString = (): string => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
};

export const toDateString = (year: number, month: number, day: number): string =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

export const getMonthLabel = (date: Date): string =>
    `${MONTH_NAMES_FULL[date.getMonth()]} ${date.getFullYear()}`;

export const formatDateShort = (dateString: string): string => {
    const normalized = dateString.length === 10 ? dateString + 'T00:00:00' : dateString;
    const date = new Date(normalized);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    if (date.getTime() === today.getTime()) return 'Today';
    return `${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const formatDateDisplay = (dateString: string): string => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const formatted = `${MONTH_NAMES_FULL[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return dateOnly.getTime() === today.getTime() ? `${formatted} (Today)` : formatted;
};

export const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    const month = MONTH_NAMES_SHORT[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const rawHours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = rawHours >= 12 ? 'PM' : 'AM';
    const hours = rawHours % 12 === 0 ? 12 : rawHours % 12;
    return `${month} ${day}, ${year} ${hours}:${minutes} ${period}`;
};

export const parseBirthday = (dob?: string): { month: string; day: string; year: string } => {
    if (!dob) return { month: '', day: '', year: '' };
    const parts = dob.split(' ');
    return { month: parts[0] || '', day: parts[1] || '', year: parts[2] || '' };
};

export const composeBirthday = (month: string, day: string, year: string): string =>
    [month, day, year].filter(Boolean).join(' ');

export type HistoryDateField = { label: string; value: string };
export const getHistoryDateFields = (status: string, createdAt: string, updatedAt: string): HistoryDateField[] => {
    switch (status) {
        case 'created':
            return [{ label: 'Created On:', value: formatTimestamp(createdAt) }];
        case 'edited':
            return [{ label: 'Last Edited:', value: formatTimestamp(updatedAt) }];
        case 'completed':
            return [{ label: 'Completed On:', value: formatTimestamp(updatedAt) }];
        case 'deleted':
            return [{ label: 'Deleted On:', value: formatTimestamp(updatedAt) }];
        case 'trashed':
            return [{ label: 'Moved to Trash:', value: formatTimestamp(updatedAt) }];
        case 'unfinished':
            return [
                { label: 'Created On:', value: formatTimestamp(createdAt) },
                { label: 'Removed On:', value: formatTimestamp(updatedAt) }
            ];
        default:
            return [{ label: 'Updated:', value: formatTimestamp(updatedAt) }];
    }
};