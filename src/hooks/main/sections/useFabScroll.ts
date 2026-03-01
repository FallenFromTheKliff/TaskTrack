import { useRef } from 'react';
import { Animated } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

export function useFabScroll() {
    const { settings } = useTheme();
    const fabAnim = useRef(new Animated.Value(1)).current;
    const lastScrollY = useRef(0);

    const handleScroll = (event: any) => {
        if (!settings.useAnimations) return;
        const currentY = event.nativeEvent.contentOffset.y;
        if (currentY < 20) {
            Animated.timing(fabAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
        } else if (currentY > lastScrollY.current + 10) {
            Animated.timing(fabAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
        } else if (currentY < lastScrollY.current - 10) {
            Animated.timing(fabAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
        }
        lastScrollY.current = currentY;
    };

    return { fabAnim, handleScroll };
}