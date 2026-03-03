import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

import { AnimatedPlayerText } from "@/components/fields/PlayerText";
import { useLoadingText } from "@/hooks/main/useLoadingText";
import { useTheme, THEMES } from "@/contexts/ThemeContext";

const NAVY = THEMES.navy;
const outerStyle = StyleSheet.create({
    outer: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
    inner: { flex: 1, width: '100%', maxWidth: 450, justifyContent: 'center', alignItems: 'center' }
});

type LoadingScreenProps = {
    onDone: () => void;
};

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
    const { colors, activeFontColor } = useTheme();
    const loadingText = useLoadingText('Loading', true);

    const targetBg = colors.bgDeep;
    const targetText = activeFontColor || colors.accentBlue;

    const themeAnim = useRef(new Animated.Value(0)).current;
    const bgColor = themeAnim.interpolate({ inputRange: [0, 1], outputRange: [NAVY.bgDeep, targetBg] });
    const textColor = themeAnim.interpolate({ inputRange: [0, 1], outputRange: [NAVY.accentBlue, targetText] });

    useEffect(() => {
        const themeTimer = setTimeout(() => {
            Animated.timing(themeAnim, { toValue: 1, duration: 400, useNativeDriver: false }).start();
        }, 600);
        const exitTimer = setTimeout(() => { onDone(); }, 1500);
        return () => {
            clearTimeout(themeTimer);
            clearTimeout(exitTimer);
        };
    }, []);

    return (
        <View style={outerStyle.outer}>
            <Animated.View style={[outerStyle.inner, { backgroundColor: bgColor }]}>
                <AnimatedPlayerText style={{ fontSize: 36, color: textColor }}>
                    {loadingText}
                </AnimatedPlayerText>
            </Animated.View>
        </View>
    );
}