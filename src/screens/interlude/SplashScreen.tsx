import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme, THEMES, FONT_FAMILIES } from '@/contexts/ThemeContext';

const NAVY = THEMES.navy;
const styles = StyleSheet.create({
    outer: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
    inner: { flex: 1, width: '100%', maxWidth: 450, justifyContent: 'center', alignItems: 'center' },
    splash: { flexDirection: 'row', alignItems: 'center' },
    title: { fontSize: 52, marginLeft: 8 }
});

type SplashScreenProps = {
    isAuthenticated: boolean;
};

export default function SplashScreen({ isAuthenticated }: SplashScreenProps) {
    const { colors, activeIconColor, activeFont, activeFontColor } = useTheme();

    const bgColor = isAuthenticated ? colors.bgDeep   : NAVY.bgDeep;
    const iconColor = isAuthenticated ? (activeIconColor ?? colors.accentBlue) : NAVY.accentBlue;
    const fontFamily = isAuthenticated ? FONT_FAMILIES[activeFont] : FONT_FAMILIES.blrrpix;
    const textColor = isAuthenticated ? (activeFontColor ?? colors.textPrimary) : NAVY.textPrimary;

    const scaleAnim = useRef(new Animated.Value(0.6)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const [displayedTitle, setDisplayedTitle] = useState('');
    const projectTitle = "TaskTrack";

    useEffect(() => {
        Animated.spring(scaleAnim, { toValue: 1, friction: 10, tension: 40, useNativeDriver: true }).start(() => {
            let index = 0;
            const typewriter = setInterval(() => {
                if (index < projectTitle.length) {
                    setDisplayedTitle(projectTitle.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(typewriter);
                    setTimeout(() => {
                        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start();
                    }, 80);
                }
            }, 60);
        });
    }, []);

    return (
        <View style={styles.outer}>
            <View style={[styles.inner, { backgroundColor: bgColor }]}>
                <Animated.View style={[styles.splash, { transform: [{ scale: scaleAnim }], opacity: fadeAnim }]}>
                    <Ionicons name="folder-open-sharp" size={56} color={iconColor} />
                    <Animated.Text style={[styles.title, { fontFamily, color: textColor }]}>
                        {displayedTitle}
                    </Animated.Text>
                </Animated.View>
            </View>
        </View>
    );
}