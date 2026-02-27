export const PRIORITY_LABELS: Record<string, string> = {
    low: 'Low',
    medium: 'Average',
    high: 'Urgent'
};
export const PRIORITY_COLORS: Record<string, string> = {
    low: '#5A9E5A',
    medium: '#9E8E3A',
    high: '#9E4A4A'
};
export const PRIORITY_BG: Record<string, string> = {
    low: '#2A3F2A',
    medium: '#3F3A20',
    high: '#3F2020'
};
export const PRIORITY_BORDER: Record<string, string> = {
    low: '#4A6F4A',
    medium: '#6F6030',
    high: '#6F3030'
};
export const PRIORITY_ICON_NAMES: Record<string, string> = {
    low: 'arrow-down-circle-outline',
    medium: 'remove-circle-outline',
    high: 'arrow-up-circle-outline'
};
export const STATUS_COLORS: Record<string, string> = {
    created: '#7BAFD4',
    edited: '#8A9BAD',
    completed: '#6DC48A',
    deleted: '#C47A7A',
    trashed: '#C47A7A',
    unfinished: '#C4A27A'
};
export const STATUS_ICONS: Record<string, string> = {
    created: 'add-circle-outline',
    edited: 'pencil-outline',
    completed: 'checkmark-circle-outline',
    deleted: 'trash-outline',
    trashed: 'trash-outline',
    unfinished: 'alert-circle-outline'
};
export const TASK_ICONS = [
    'home-outline', 'person-outline',
    'briefcase-outline', 'cart-outline',
    'cafe-outline', 'barbell-outline',
    'checkbox-outline', 'wallet-outline',
    'pricetag-outline', 'gift-outline',
    'book-outline', 'musical-notes-outline',
    'flag-outline', 'flame-outline',
    'bulb-outline', 'rocket-outline',
    'trophy-outline', 'leaf-outline'
];
export const DEFAULT_TASK_ICON = 'checkbox-outline';
export const DISPLAY_OPTIONS: { label: string; value: number }[] = [
    { label: 'All', value: -1 },
    { label: '5', value: 5 },
    { label: '10', value: 10 }
];
export const FILTER_PRIORITY_OPTIONS: { label: string; value: string; activeText: string; activeBorder: string; activeBg: string }[] = [
    { label: 'All', value: '', activeText: '#7BAFD4', activeBorder: '#5B7FA6', activeBg: '#1A2A3A' },
    { label: 'Low', value: 'low', activeText: '#5A9E5A', activeBorder: '#4A6F4A', activeBg: '#1A2A1A' },
    { label: 'Average', value: 'medium', activeText: '#9E8E3A', activeBorder: '#6F6030', activeBg: '#2A2510' },
    { label: 'Urgent', value: 'high', activeText: '#9E4A4A', activeBorder: '#6F3030', activeBg: '#2A1515' }
];
export const FILTER_STATUS_OPTIONS: { label: string; value: string; activeText: string; activeBorder: string; activeBg: string }[] = [
    { label: 'All', value: '', activeText: '#7BAFD4', activeBorder: '#5B7FA6', activeBg: '#1A2A3A' },
    { label: 'Created', value: 'created', activeText: '#7BAFD4', activeBorder: '#5B7FA6', activeBg: '#1A2535' },
    { label: 'Edited', value: 'edited', activeText: '#8A9BAD', activeBorder: '#5E6E7A', activeBg: '#1E2832' },
    { label: 'Completed', value: 'completed', activeText: '#6DC48A', activeBorder: '#4A8A5F', activeBg: '#1A2A1A' },
    { label: 'Deleted', value: 'deleted', activeText: '#C47A7A', activeBorder: '#8A4545', activeBg: '#2A1515' }
];
export const FILTER_TRASH_STATUS_OPTIONS: { label: string; value: string; activeText: string; activeBorder: string; activeBg: string }[] = [
    { label: 'All', value: '', activeText: '#7BAFD4', activeBorder: '#5B7FA6', activeBg: '#1A2A3A' },
    { label: 'Pending Deletion', value: 'trashed', activeText: '#C47A7A', activeBorder: '#8A4545', activeBg: '#2A1515' },
    { label: 'Unfinished Task(s)', value: 'unfinished', activeText: '#C4A27A', activeBorder: '#8A6F45', activeBg: '#2A2010' }
];
export const SEARCH_PLACEHOLDERS: Record<string, string> = {
    tasks: 'Search tasks...',
    history: 'Search history...',
    trash: 'Search trash...'
};
export const FILTER_PANEL_HEIGHTS: Record<string, number> = {
    tasks: 240,
    history: 170,
    trash: 155
};