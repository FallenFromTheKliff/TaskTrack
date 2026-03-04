import { StyleSheet, Text, TextProps, TextInput, TextInputProps, Animated } from 'react-native';

import { useTheme, FONT_FAMILIES, THEMES } from '@/contexts/ThemeContext';

const NAVY = THEMES.navy;

export function PlayerText({ style, ...props }: TextProps) {
    const { activeFont, activeFontColor, colors } = useTheme();
    const flatStyle = StyleSheet.flatten(style);
    const hasColorOverride = flatStyle?.color !== undefined && flatStyle.color !== colors.textPrimary;
    return (
        <Text
            {...props}
            style={[
                { fontFamily: FONT_FAMILIES[activeFont], color: colors.textPrimary },
                style,
                activeFontColor && !hasColorOverride ? { color: activeFontColor } : undefined
            ]}
        />
    );
}

export function AnimatedPlayerText({ style, ...props }: Animated.AnimatedProps<TextProps>) {
    const { activeFont } = useTheme();
    return (
        <Animated.Text
            {...props}
            style={[{ fontFamily: FONT_FAMILIES[activeFont] }, style]}
        />
    );
}

export function AuthText({ style, ...props }: TextProps) {
    return (
        <Text
            {...props}
            style={[{ fontFamily: FONT_FAMILIES.blrrpix, color: NAVY.textPrimary }, style]}
        />
    );
}

export function PlayerTextInput({ style, ...props }: TextInputProps) {
    const { activeFont, activeFontColor, colors } = useTheme();
    const flatStyle = StyleSheet.flatten(style);
    const hasColorOverride = flatStyle?.color !== undefined && flatStyle.color !== colors.textPrimary;
    return (
        <TextInput
            style={[{
                fontFamily: FONT_FAMILIES[activeFont],
                color: colors.textPrimary,
                flex: 1,
                paddingVertical: 15,
                paddingHorizontal: 5,
                fontSize: 18
            }, style, activeFontColor && !hasColorOverride ? { color: activeFontColor } : undefined]}
            placeholderTextColor={colors.textMuted}
            {...props}
        />
    );
}