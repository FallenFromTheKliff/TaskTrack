import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeKey = 'navy' | 'citrus' | 'light' | 'dark';
export type FontKey = 'blrrpix' | 'caveatbrush' | 'geo' | 'macondo' | 'notoserif';
export type FontColorKey = 'default' | 'white' | 'mint' | 'neon' | 'lavender' | 'lightOrange' | 'black' | 'navyBlue' | 'brown' | 'darkGreen' | 'purple';
export type ThemeColors = {
    bgDeep: string; bgPanel: string; bgInput: string; bgInputDark: string;
    bgDivider: string; cardBg: string; cardBorder: string; cardHeaderBg: string;
    fieldBg: string; fieldBorder: string; fieldDisabledBg: string; fieldDisabledBorder: string;
    borderStrong: string; borderMid: string; borderSub: string;
    textPrimary: string; textSecondary: string; textMuted: string; textDisabled: string;
    accentBlue: string; accentGreen: string; accentRed: string; accentRedBg: string;
    accentRedLight: string; accentRedLightBorder: string; accentGold: string; accentOrange: string;
    errorRed: string; greenBg: string; greenBorder: string; overlay88: string; overlay92: string;
};
export type ThemeSettings = {
    themeKey: ThemeKey; fontKey: FontKey; fontColorKey: FontColorKey; useAnimations: boolean;
};

export const THEMES: Record<ThemeKey, ThemeColors> = {
    navy: {
        bgDeep: '#161C24', bgPanel: '#1E2832', bgInput: '#384757', bgInputDark: '#252D36',
        bgDivider: '#313B46', cardBg: '#1E2832', cardBorder: '#313B46', cardHeaderBg: '#1A2530',
        fieldBg: '#384757', fieldBorder: '#6D8196', fieldDisabledBg: '#252D36', fieldDisabledBorder: '#313B46',
        borderStrong: '#6D8196', borderMid: '#4E5D6D', borderSub: '#313B46',
        textPrimary: '#BFCDDC', textSecondary: '#8EA7C1', textMuted: '#6D8196', textDisabled: '#4E5D6D',
        accentBlue: '#8EA7C1', accentGreen: '#6DC48A', accentRed: '#C47A7A', accentRedBg: '#8B3A3A',
        accentRedLight: '#3A1E1E', accentRedLightBorder: '#5A2E2E', accentGold: '#C4A27A',
        accentOrange: '#C47A3A', errorRed: '#FF6B6B', greenBg: '#1E3328', greenBorder: '#2E5A3E',
        overlay88: 'rgba(22, 28, 36, 0.88)', overlay92: 'rgba(22, 28, 36, 0.92)',
    },
    citrus: {
        bgDeep: '#F0E4C8', bgPanel: '#F5C878', bgInput: '#FFE8C8', bgInputDark: '#FAD898',
        bgDivider: '#F8DCA8', cardBg: '#FFFCF4', cardBorder: '#E8B860', cardHeaderBg: '#FEF4E4',
        fieldBg: '#FFE8C8', fieldBorder: '#C87820', fieldDisabledBg: '#FAD898', fieldDisabledBorder: '#E8C880',
        borderStrong: '#C87820', borderMid: '#D89838', borderSub: '#E8C870',
        textPrimary: '#3A2000', textSecondary: '#6A3C00', textMuted: '#A06020', textDisabled: '#C8A060',
        accentBlue: '#B86010', accentGreen: '#4A7A20', accentRed: '#B83010', accentRedBg: '#FDDDD0',
        accentRedLight: '#FEF0EA', accentRedLightBorder: '#F5B8A0', accentGold: '#C87800',
        accentOrange: '#E05010', errorRed: '#CC2200', greenBg: '#E8F5D8', greenBorder: '#7AAA40',
        overlay88: 'rgba(240, 228, 200, 0.88)', overlay92: 'rgba(240, 228, 200, 0.92)',
    },
    light: {
        bgDeep: '#F0F4F8', bgPanel: '#FFFFFF', bgInput: '#E8EEF4', bgInputDark: '#DDE4EC',
        bgDivider: '#D0DAE4', cardBg: '#FFFFFF', cardBorder: '#C0D0E0', cardHeaderBg: '#F4F8FC',
        fieldBg: '#E8EEF4', fieldBorder: '#7A9AB8', fieldDisabledBg: '#DDE4EC', fieldDisabledBorder: '#C0D0E0',
        borderStrong: '#7A9AB8', borderMid: '#9AB0C8', borderSub: '#C0D0E0',
        textPrimary: '#1E2832', textSecondary: '#2E4A6A', textMuted: '#4A6A8A', textDisabled: '#8AA0B8',
        accentBlue: '#3A6A9E', accentGreen: '#2A7A4A', accentRed: '#9E3A3A', accentRedBg: '#F0D0D0',
        accentRedLight: '#FAE8E8', accentRedLightBorder: '#E0B0B0', accentGold: '#8A6020',
        accentOrange: '#9A5020', errorRed: '#CC2222', greenBg: '#D8F0E0', greenBorder: '#6AB88A',
        overlay88: 'rgba(200, 215, 230, 0.88)', overlay92: 'rgba(200, 215, 230, 0.92)',
    },
    dark: {
        bgDeep: '#0A0A0A', bgPanel: '#141414', bgInput: '#202020', bgInputDark: '#181818',
        bgDivider: '#1C1C1C', cardBg: '#141414', cardBorder: '#242424', cardHeaderBg: '#111111',
        fieldBg: '#202020', fieldBorder: '#505050', fieldDisabledBg: '#181818', fieldDisabledBorder: '#242424',
        borderStrong: '#505050', borderMid: '#383838', borderSub: '#242424',
        textPrimary: '#E0E0E0', textSecondary: '#A0A0A0', textMuted: '#686868', textDisabled: '#404040',
        accentBlue: '#7AA0C8', accentGreen: '#5AAA6A', accentRed: '#C06060', accentRedBg: '#5A2020',
        accentRedLight: '#2A1010', accentRedLightBorder: '#4A1E1E', accentGold: '#C0983A',
        accentOrange: '#C07030', errorRed: '#FF5555', greenBg: '#102010', greenBorder: '#1E481E',
        overlay88: 'rgba(10, 10, 10, 0.88)', overlay92: 'rgba(10, 10, 10, 0.92)'
    }
};

export const THEME_LABELS: Record<ThemeKey, string> = {
    navy: 'Navy Blue', citrus: 'Citrus', light: 'Light Mode', dark: 'Dark Mode'
};
export const FONT_FAMILIES: Record<FontKey, string> = {
    blrrpix: 'Blrrpix', caveatbrush: 'CaveatBrush', geo: 'Geo', macondo: 'Macondo', notoserif: 'NotoSerif'
};
export const FONT_LABELS: Record<FontKey, string> = {
    blrrpix: 'Blrrpix (Default)', caveatbrush: 'Caveat Brush', geo: 'Geo',
    macondo: 'Macondo', notoserif: 'Noto Serif'
};
export const FONT_COLORS: Record<FontColorKey, string> = {
    default: '',
    white: '#F0F0F0', mint: '#78C8A8', neon: '#00BFFF',
    lavender: '#B898D8', lightOrange: '#F4A460',
    black: '#0A0A0A', navyBlue: '#1E3A5F', brown: '#6B3A2A',
    darkGreen: '#1A4A2A', purple: '#5B2D8E'
};
export const FONT_COLOR_LABELS: Record<FontColorKey, string> = {
    default: 'Default',
    white: 'White', mint: 'Mint', neon: 'Deep Sky Blue',
    lavender: 'Lavender', lightOrange: 'Light Orange',
    black: 'Black', navyBlue: 'Navy Blue', brown: 'Brown',
    darkGreen: 'Dark Green', purple: 'Purple'
};

export const DARK_THEME_FONT_COLOR_KEYS: FontColorKey[] = ['default', 'white', 'mint', 'neon', 'lavender', 'lightOrange'];
export const LIGHT_THEME_FONT_COLOR_KEYS: FontColorKey[] = ['default', 'black', 'navyBlue', 'brown', 'darkGreen', 'purple'];

export const FONT_COLOR_KEYS_BY_THEME: Record<ThemeKey, FontColorKey[]> = {
    navy: DARK_THEME_FONT_COLOR_KEYS, dark: DARK_THEME_FONT_COLOR_KEYS,
    light: LIGHT_THEME_FONT_COLOR_KEYS, citrus: LIGHT_THEME_FONT_COLOR_KEYS
};
export const DEFAULT_FONT_COLOR_BY_THEME: Record<ThemeKey, string> = {
    dark: '#F0F0F0', navy: '#8EA7C1', light: '#0A0A0A', citrus: '#6B3A2A'
};

type ThemeContextType = {
    colors: ThemeColors; activeFont: FontKey; activeFontColor: string | null;
    activeIconColor: string | null; settings: ThemeSettings;
    setTheme: (key: ThemeKey) => void; setFont: (key: FontKey) => void;
    setAppearance: (themeKey: ThemeKey, fontKey: FontKey, fontColorKey: FontColorKey) => void;
    resetAppearance: () => void;
    setUseAnimations: (val: boolean) => void;
    previewTheme: (key: ThemeKey | null) => void; previewFont: (key: FontKey | null) => void;
    previewFontColor: (key: FontColorKey | null) => void;
};

const THEME_STORAGE_KEY = '@tasktrack_theme';
const DEFAULT_SETTINGS: ThemeSettings = {themeKey: 'navy', fontKey: 'blrrpix', fontColorKey: 'default', useAnimations: true};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<ThemeSettings>(DEFAULT_SETTINGS);
    const [previewThemeKey, setPreviewThemeKey] = useState<ThemeKey | null>(null);
    const [previewFontKey, setPreviewFontKey] = useState<FontKey | null>(null);
    const [previewFontColorKey, setPreviewFontColorKey] = useState<FontColorKey | null>(null);

    useEffect(() => { loadSettings(); }, []);

    const loadSettings = async () => {
        try {
            const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (stored) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
        } catch {}
    };

    const saveSettings = async (updated: ThemeSettings) => {
        setSettings(updated);
        try { await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated)); } catch {}
    };

    const setTheme = (key: ThemeKey) => saveSettings({ ...settings, themeKey: key });
    const setFont  = (key: FontKey)  => saveSettings({ ...settings, fontKey: key });
    const setAppearance = (themeKey: ThemeKey, fontKey: FontKey, fontColorKey: FontColorKey) =>
        saveSettings({ ...settings, themeKey, fontKey, fontColorKey });
    const resetAppearance = () => {
        saveSettings(DEFAULT_SETTINGS);
        setPreviewThemeKey(null);
        setPreviewFontKey(null);
        setPreviewFontColorKey(null);
    };
    const setUseAnimations = (val: boolean) => saveSettings({ ...settings, useAnimations: val });

    const previewTheme = (key: ThemeKey | null) => setPreviewThemeKey(key);
    const previewFont = (key: FontKey | null) => setPreviewFontKey(key);
    const previewFontColor = (key: FontColorKey | null) => setPreviewFontColorKey(key);

    const activeThemeKey = previewThemeKey ?? settings.themeKey;
    const activeFont = previewFontKey  ?? settings.fontKey;
    const activeFontColorKey = previewFontColorKey ?? settings.fontColorKey;
    const activeFontColor = activeFontColorKey === 'default' ? DEFAULT_FONT_COLOR_BY_THEME[activeThemeKey] : FONT_COLORS[activeFontColorKey];
    const activeIconColor = activeFontColor || null;

    return (
        <ThemeContext.Provider value={{
            colors: THEMES[activeThemeKey], activeFont, activeFontColor, activeIconColor,
            settings, setTheme, setFont, setAppearance, resetAppearance, setUseAnimations,
            previewTheme, previewFont, previewFontColor,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
};