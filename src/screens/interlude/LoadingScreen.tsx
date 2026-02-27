import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

import { PlayerText } from "@/components/fields/PlayerText";
import { useLoadingText } from "@/hooks/main/useLoadingText";

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        flex: 1,
        width: '100%',
        maxWidth: 450,
        backgroundColor: '#161C24',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

type LoadingScreenProps = {
    onDone: () => void;
};

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const loadingText = useLoadingText('Loading', true);

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();

        const exitTimer = setTimeout(() => {
            Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => onDone());
        }, 1100);

        return () => clearTimeout(exitTimer);
    }, []);

    return (
        <View style={styles.outer}>
            <View style={styles.inner}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <PlayerText style={{ fontSize: 36, color: '#8EA7C1' }}>
                        {loadingText}
                    </PlayerText>
                </Animated.View>
            </View>
        </View>
    );
}