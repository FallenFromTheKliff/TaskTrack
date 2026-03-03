import { Animated } from 'react-native';

import { useTheme, THEMES, ThemeColors } from '@/contexts/ThemeContext';

export type InterpolatedColors = {
    [umay in keyof ThemeColors]: Animated.AnimatedInterpolation<string>;
};

export function useThemeTransitionAnim(): { ic: InterpolatedColors; anim: Animated.Value } {
    const { colors, prevThemeKey, themeTransitionAnim } = useTheme();
    const prev = THEMES[prevThemeKey];
    const next = colors;

    const interpolate = (key: keyof ThemeColors): Animated.AnimatedInterpolation<string> =>
        themeTransitionAnim.interpolate({ inputRange: [0, 1], outputRange: [prev[key], next[key]] });

    const ic: InterpolatedColors = {
        bgDeep: interpolate('bgDeep'),
        bgPanel: interpolate('bgPanel'),
        bgInput: interpolate('bgInput'),
        bgInputDark: interpolate('bgInputDark'),
        bgDivider: interpolate('bgDivider'),
        cardBg: interpolate('cardBg'),
        cardBorder: interpolate('cardBorder'),
        cardHeaderBg: interpolate('cardHeaderBg'),
        fieldBg: interpolate('fieldBg'),
        fieldBorder: interpolate('fieldBorder'),
        fieldDisabledBg: interpolate('fieldDisabledBg'),
        fieldDisabledBorder: interpolate('fieldDisabledBorder'),
        borderStrong: interpolate('borderStrong'),
        borderMid: interpolate('borderMid'),
        borderSub: interpolate('borderSub'),
        textPrimary: interpolate('textPrimary'),
        textSecondary: interpolate('textSecondary'),
        textMuted: interpolate('textMuted'),
        textDisabled: interpolate('textDisabled'),
        accentBlue: interpolate('accentBlue'),
        accentGreen: interpolate('accentGreen'),
        accentRed: interpolate('accentRed'),
        accentRedBg: interpolate('accentRedBg'),
        accentRedLight: interpolate('accentRedLight'),
        accentRedLightBorder: interpolate('accentRedLightBorder'),
        accentGold: interpolate('accentGold'),
        accentOrange: interpolate('accentOrange'),
        errorRed: interpolate('errorRed'),
        greenBg: interpolate('greenBg'),
        greenBorder: interpolate('greenBorder'),
        overlay88: interpolate('overlay88'),
        overlay92: interpolate('overlay92')
    };

    return { ic, anim: themeTransitionAnim };
}