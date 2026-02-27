import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import { useEntranceAnim } from '@/hooks/animations/useEntranceAnim';

export function useAuthEntrance() {
    const { opacity: fadeIn } = useEntranceAnim();
    const takeFlight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timeout = setTimeout(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(takeFlight, { toValue: -10, duration: 2000, useNativeDriver: true }),
                    Animated.timing(takeFlight, { toValue: 0, duration: 2000, useNativeDriver: true }),
                ])
            ).start();
        }, 150);
        return () => clearTimeout(timeout);
    }, []);

    return { fadeIn, takeFlight };
}