import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export function useEntranceAnim(fromY = 28, duration = 300) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(fromY)).current;
    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration, useNativeDriver: true })
        ]).start();
    }, []);
    return { opacity, translateY };
}