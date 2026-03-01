import { useRef, useState } from 'react';
import { Animated } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

type ToggleAnimOptions = {
    duration?: number;
    closeDuration?: number;
    useSpring?: boolean;
    friction?: number;
    tension?: number;
};

export function useToggleAnim({ duration = 250, closeDuration, useSpring = false, friction = 8, tension = 50 }: ToggleAnimOptions = {}) {
    const { settings } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const anim = useRef(new Animated.Value(0)).current;

    const toggle = (overrideOpen?: boolean) => {
        const opening = overrideOpen !== undefined ? overrideOpen : !isOpen;
        setIsOpen(opening);
        if (!settings.useAnimations) {
            anim.setValue(opening ? 1 : 0);
            return opening;
        }
        if (useSpring) {
            Animated.spring(anim, { toValue: opening ? 1 : 0, friction, tension, useNativeDriver: true }).start();
        } else {
            Animated.timing(anim, {
                toValue: opening ? 1 : 0,
                duration: opening ? duration : (closeDuration ?? duration),
                useNativeDriver: true,
            }).start();
        }
        return opening;
    };

    return { anim, isOpen, toggle };
}