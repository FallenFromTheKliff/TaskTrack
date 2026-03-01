import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

type PanelRevealOptions = {
    targetHeight: number;
    visible: boolean;
    duration?: number;
};

export function usePanelAnim({ targetHeight, visible, duration = 300 }: PanelRevealOptions) {
    const { settings } = useTheme();
    const height = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!settings.useAnimations) {
            height.setValue(visible ? targetHeight : 0);
            opacity.setValue(visible ? 1 : 0);
            return;
        }
        Animated.parallel([
            Animated.timing(height, { toValue: visible ? targetHeight : 0, duration, useNativeDriver: false }),
            Animated.timing(opacity, { toValue: visible ? 1 : 0, duration, useNativeDriver: false }),
        ]).start();
    }, [visible, settings.useAnimations]);

    return { height, opacity };
}