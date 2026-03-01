import { useState, useRef } from 'react';
import { Animated } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { useToggleAnim } from '@/hooks/animations/useToggleAnim';

export function useExpandCard() {
    const { settings } = useTheme();
    const [bodyHeight, setBodyHeight] = useState(0);
    const { anim, isOpen: isExpanded, toggle } = useToggleAnim({ duration: 250, closeDuration: 150 });

    const bodyHeightAnim = useRef(new Animated.Value(0)).current;
    const bodyOpacityAnim = useRef(new Animated.Value(0)).current;

    const handleToggleExpand = () => {
        const expanding = toggle();
        if (!settings.useAnimations) {
            bodyHeightAnim.setValue(expanding ? 1 : 0);
            bodyOpacityAnim.setValue(expanding ? 1 : 0);
            return;
        }
        Animated.parallel([
            Animated.timing(bodyHeightAnim, { toValue: expanding ? 1 : 0, duration: 300, useNativeDriver: false }),
            Animated.timing(bodyOpacityAnim, { toValue: expanding ? 1 : 0, duration: expanding ? 300 : 150, useNativeDriver: false }),
        ]).start();
    };

    const chevronRotation = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

    return { isExpanded, bodyHeight, setBodyHeight, handleToggleExpand, chevronRotation, bodyHeightAnim, bodyOpacityAnim };
}