import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

import { useLoadingText } from "@/hooks/main/useLoadingText";
import { useTheme, THEMES } from "@/contexts/ThemeContext";

const NAVY = THEMES.navy;
const styles = StyleSheet.create({
    outer: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
    inner: { flex: 1, width: '100%', maxWidth: 450, backgroundColor: NAVY.bgDeep, justifyContent: 'center', alignItems: 'center' },
    text: { fontFamily: 'Blrrpix', fontSize: 36 }
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
            Animated.timing(themeAnim, { toValue: 1, duration: 1000, useNativeDriver: false }).start();
        }, 1000);
        const exitTimer = setTimeout(() => { onDone(); }, 2200);
        return () => {
            clearTimeout(themeTimer);
            clearTimeout(exitTimer);
        };
    }, []);

    return (
        <View style={styles.outer}>
            <Animated.View style={[styles.inner, { backgroundColor: bgColor }]}>
                <Animated.Text style={[styles.text, { color: textColor }]}>
                    {loadingText}
                </Animated.Text>
            </Animated.View>
        </View>
    );
}