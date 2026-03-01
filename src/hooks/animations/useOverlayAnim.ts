import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

type OverlayAnimMode = 'scale' | 'slideUp';

export function useOverlayAnim(isVisible: boolean, mode: OverlayAnimMode = 'scale') {
    const { settings } = useTheme();
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.92)).current;
    const translateY = useRef(new Animated.Value(60)).current;

    useEffect(() => {
        if (isVisible) {
            if (!settings.useAnimations) {
                opacity.setValue(1);
                scale.setValue(1);
                translateY.setValue(0);
                return;
            }
            opacity.setValue(0);
            if (mode === 'scale') {
                scale.setValue(0.92);
                Animated.parallel([
                    Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
                    Animated.spring(scale, { toValue: 1, friction: 8, tension: 50, useNativeDriver: true }),
                ]).start();
            } else {
                translateY.setValue(60);
                Animated.parallel([
                    Animated.timing(opacity, { toValue: 1, duration: 280, useNativeDriver: true }),
                    Animated.spring(translateY, { toValue: 0, friction: 8, tension: 50, useNativeDriver: true }),
                ]).start();
            }
        } else {
            if (!settings.useAnimations) {
                opacity.setValue(0);
                scale.setValue(0.92);
                translateY.setValue(60);
                return;
            }
            if (mode === 'scale') {
                Animated.parallel([
                    Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
                    Animated.timing(scale, { toValue: 0.92, duration: 180, useNativeDriver: true }),
                ]).start();
            } else {
                Animated.parallel([
                    Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
                    Animated.timing(translateY, { toValue: 60, duration: 200, useNativeDriver: true }),
                ]).start();
            }
        }
    }, [isVisible, settings.useAnimations]);

    return { opacity, scale, translateY };
}