import { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { ScreenKey } from '@/contexts/ScreenContext';
import { useTask } from '@/contexts/TaskContext';

import styles from '@/styles/components/HeaderMessageStyles';

type HeaderMessageProps = {
    activeScreen: ScreenKey;
    selectedDate: string;
};

const MESSAGES: Record<ScreenKey, string> = {
    profile: 'Manage Profile Settings',
    tasks: 'Tasks Completed:',
    history: 'Complete Record of Tasks',
    trash: 'Review Discarded Tasks',
    settings: 'Settings and Preferences'
};

function getQuadrantAngles(percent: number) {
    const clamp = (v: number) => Math.max(0, Math.min(90, v));
    return {
        ne: clamp((percent / 25) * 90),
        se: clamp(((percent - 25) / 25) * 90),
        sw: clamp(((percent - 50) / 25) * 90),
        nw: clamp(((percent - 75) / 25) * 90),
    };
}

function ProgressCircle({ completed, total }: { completed: number; total: number }) {
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const allDone = total > 0 && completed === total;
    const angles = getQuadrantAngles(percent);

    const neAnim = useRef(new Animated.Value(0)).current;
    const seAnim = useRef(new Animated.Value(0)).current;
    const swAnim = useRef(new Animated.Value(0)).current;
    const nwAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(neAnim, { toValue: angles.ne, duration: 400, useNativeDriver: true }),
            Animated.timing(seAnim, { toValue: angles.se, duration: 400, useNativeDriver: true }),
            Animated.timing(swAnim, { toValue: angles.sw, duration: 400, useNativeDriver: true }),
            Animated.timing(nwAnim, { toValue: angles.nw, duration: 400, useNativeDriver: true })
        ]).start();
    }, [angles.ne, angles.se, angles.sw, angles.nw]);

    const makeRotation = (anim: Animated.Value) =>
        anim.interpolate({ inputRange: [0, 90], outputRange: ['0deg', '90deg'] });

    const ringStyle = allDone ? styles.ringDone : undefined;

    return (
        <View style={styles.circleWrapper}>
            <View style={styles.circleBackground} />
            <View style={[styles.quadrant, styles.quadrantNE]}>
                <Animated.View style={[styles.quadrantInner, styles.quadrantInnerNE, ringStyle, { transform: [{ rotate: makeRotation(neAnim) }] }]} />
            </View>
            <View style={[styles.quadrant, styles.quadrantSE]}>
                <Animated.View style={[styles.quadrantInner, styles.quadrantInnerSE, ringStyle, { transform: [{ rotate: makeRotation(seAnim) }] }]} />
            </View>
            <View style={[styles.quadrant, styles.quadrantSW]}>
                <Animated.View style={[styles.quadrantInner, styles.quadrantInnerSW, ringStyle, { transform: [{ rotate: makeRotation(swAnim) }] }]} />
            </View>
            <View style={[styles.quadrant, styles.quadrantNW]}>
                <Animated.View style={[styles.quadrantInner, styles.quadrantInnerNW, ringStyle, { transform: [{ rotate: makeRotation(nwAnim) }] }]} />
            </View>
            <PlayerText style={[styles.percentText, allDone && styles.percentTextDone]}>
                {percent}%
            </PlayerText>
        </View>
    );
}

export default function HeaderMessage({ activeScreen, selectedDate }: HeaderMessageProps) {
    const { getTasksByDate } = useTask();

    const dateTasks = getTasksByDate(selectedDate);
    const completed = dateTasks.filter(t => t.completed).length;
    const total = dateTasks.length;

    return (
        <View style={styles.container}>
            <PlayerText style={styles.message} numberOfLines={1}>
                {MESSAGES[activeScreen]}
            </PlayerText>
            {activeScreen === 'tasks' && (
                <ProgressCircle completed={completed} total={total} />
            )}
        </View>
    );
}