import { Pressable, Animated, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText, AnimatedPlayerText, AuthText } from '@/components/fields/forms/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { InterpolatedColors } from '@/hooks/animations/useThemeTransitionAnim';
import { R } from '@/styles/shared/tokens';

export type PlayerButtonVariant = 'primary' | 'danger' | 'ghost' | 'auth' | 'link' | 'action' | 'restore';
type PlayerButtonProps = {
    label: string;
    onPress: () => void;
    variant?: PlayerButtonVariant;
    icon?: keyof typeof Ionicons.glyphMap;
    iconSize?: number;
    iconColor?: string;
    disabled?: boolean;
    flex?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    animatedColors?: Pick<InterpolatedColors, 'accentRed' | 'accentRedLight' | 'accentRedLightBorder' | 'accentGreen' | 'greenBg' | 'greenBorder' | 'accentGold'>;
    animatedTextColor?: Animated.AnimatedInterpolation<string>;
    animatedIconColor?: Animated.AnimatedInterpolation<string>;
};

export default function PlayerButton({
    label, onPress, variant = 'ghost',
    icon, iconSize = 18, iconColor,
    disabled = false, flex, style, textStyle,
    animatedColors, animatedTextColor
}: PlayerButtonProps) {
    const { colors, activeIconColor } = useTheme();
    const ic = activeIconColor ?? colors.accentBlue;
    const flexStyle: ViewStyle = flex !== undefined ? { flex } : {};

    const base: ViewStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: R.md,
        borderWidth: 2,
        gap: 8,
        ...flexStyle
    };

    const variantContainer: Record<PlayerButtonVariant, ViewStyle> = {
        primary: { ...base, backgroundColor: disabled ? colors.bgDivider : colors.greenBg, borderColor: disabled ? colors.borderSub : colors.greenBorder, paddingVertical: 14 },
        danger: { ...base, backgroundColor: disabled ? colors.bgDivider : colors.accentRedLight, borderColor: disabled ? colors.borderSub : colors.accentRedLightBorder, paddingVertical: 14 },
        ghost: { ...base, backgroundColor: colors.bgInputDark, borderColor: colors.borderMid, paddingVertical: 14 },
        auth: { ...base, backgroundColor: disabled ? colors.textMuted : colors.accentBlue, borderWidth: 0, paddingVertical: 15, marginTop: 15, marginBottom: 5 },
        link: { borderWidth: 0, backgroundColor: 'transparent', ...flexStyle },
        action: { ...base, backgroundColor: colors.bgInputDark, borderColor: colors.borderMid, paddingVertical: 10 },
        restore: { ...base, backgroundColor: colors.bgDivider, borderColor: colors.accentGold, borderWidth: 1, paddingVertical: 10 }
    };
    const variantText: Record<PlayerButtonVariant, TextStyle> = {
        primary: { fontSize: 18, color: disabled ? colors.textDisabled : colors.accentGreen },
        danger: { fontSize: 18, color: disabled ? colors.textDisabled : colors.accentRed },
        ghost: { fontSize: 18, color: colors.textMuted },
        auth: { fontSize: 24, color: colors.bgDivider },
        link: { fontSize: 18, color: disabled ? colors.textDisabled : ic, textDecorationLine: 'underline' },
        action: { fontSize: 14, color: disabled ? colors.textDisabled : ic },
        restore: { fontSize: 14, color: colors.accentGold }
    };

    const defaultIconColor: Record<PlayerButtonVariant, string> = {
        primary: disabled ? colors.textDisabled : colors.accentGreen,
        danger: disabled ? colors.textDisabled : colors.accentRed,
        ghost: colors.textMuted,
        auth: colors.bgDivider,
        link: disabled ? colors.textDisabled : ic,
        action: disabled ? colors.textDisabled : ic,
        restore: colors.accentGold
    };
    const resolvedIconColor = iconColor ?? defaultIconColor[variant];

    if (animatedColors) {
        const animBg = variant === 'danger' ? animatedColors.accentRedLight : animatedColors.greenBg;
        const animBorder = variant === 'danger' ? animatedColors.accentRedLightBorder : animatedColors.greenBorder;
        const animText = animatedTextColor ?? (variant === 'danger' ? animatedColors.accentRed : animatedColors.accentGreen);

        const outerStyle: ViewStyle = {
            borderRadius: R.md,
            borderWidth: 2,
            overflow: 'hidden',
            ...flexStyle,
            ...(style as ViewStyle | undefined)
        };
        const innerPressable: ViewStyle = {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 13,
            gap: 6
        };

        return (
            <Animated.View style={[outerStyle, { backgroundColor: animBg, borderColor: animBorder }]}>
                <Pressable style={innerPressable} onPress={onPress} disabled={disabled}>
                    {icon && (
                        <Animated.View>
                            <Ionicons name={icon} size={iconSize} color={resolvedIconColor} />
                        </Animated.View>
                    )}
                    <AnimatedPlayerText style={[{ fontSize: 16 }, textStyle, { color: animText }]}>
                        {label}
                    </AnimatedPlayerText>
                </Pressable>
            </Animated.View>
        );
    }

    const s = StyleSheet.create({ btn: variantContainer[variant] });
    const SuperText = variant === 'auth' ? AuthText : PlayerText;

    return (
        <Pressable style={[s.btn, style]} onPress={onPress} disabled={disabled}>
            {icon && <Ionicons name={icon} size={iconSize} color={resolvedIconColor} />}
            <SuperText style={[variantText[variant], textStyle]}>{label}</SuperText>
        </Pressable>
    );
}