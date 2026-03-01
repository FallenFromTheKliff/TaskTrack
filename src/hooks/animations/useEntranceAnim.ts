import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

export function useEntranceAnim(fromY = 28, duration = 300) {
    const { settings } = useTheme();
    const opacity = useRef(new Animated.Value(settings.useAnimations ? 0 : 1)).current;
    const translateY = useRef(new Animated.Value(settings.useAnimations ? fromY : 0)).current;

    useEffect(() => {
        if (!settings.useAnimations) {
            opacity.setValue(1);
            translateY.setValue(0);
            return;
        }
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration, useNativeDriver: true }),
        ]).start();
    }, [settings.useAnimations]);

    return { opacity, translateY };
}