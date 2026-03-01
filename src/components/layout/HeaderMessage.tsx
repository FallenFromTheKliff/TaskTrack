import { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { ScreenKey } from '@/contexts/ScreenContext';
import { useTask } from '@/contexts/TaskContext';
import { makeHeaderMessageStyles } from '@/styles/components/layout/HeaderMessageStyles';

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
        nw: clamp(((percent - 75) / 25) * 90)
    };
}

function ProgressCircle({ completed, total }: { completed: number; total: number }) {
    const { colors } = useTheme();
    const s = makeHeaderMessageStyles(colors);
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

    const ringColor = allDone ? colors.accentGreen : colors.accentBlue;

    return (
        <View style={s.circleWrapper}>
            <View style={s.circleBackground} />
            <View style={[s.quadrant, s.quadrantNE]}>
                <Animated.View style={[s.quadrantInner, s.quadrantInnerNE, { borderColor: ringColor, transform: [{ rotate: makeRotation(neAnim) }] }]} />
            </View>
            <View style={[s.quadrant, s.quadrantSE]}>
                <Animated.View style={[s.quadrantInner, s.quadrantInnerSE, { borderColor: ringColor, transform: [{ rotate: makeRotation(seAnim) }] }]} />
            </View>
            <View style={[s.quadrant, s.quadrantSW]}>
                <Animated.View style={[s.quadrantInner, s.quadrantInnerSW, { borderColor: ringColor, transform: [{ rotate: makeRotation(swAnim) }] }]} />
            </View>
            <View style={[s.quadrant, s.quadrantNW]}>
                <Animated.View style={[s.quadrantInner, s.quadrantInnerNW, { borderColor: ringColor, transform: [{ rotate: makeRotation(nwAnim) }] }]} />
            </View>
            <PlayerText style={[s.percentText, allDone && { color: colors.accentGreen }]}>
                {percent}%
            </PlayerText>
        </View>
    );
}

export default function HeaderMessage({ activeScreen, selectedDate }: HeaderMessageProps) {
    const { colors } = useTheme();
    const { getTasksByDate } = useTask();
    const s = makeHeaderMessageStyles(colors);

    const dateTasks = getTasksByDate(selectedDate);
    const completed = dateTasks.filter(t => t.completed).length;
    const total = dateTasks.length;

    return (
        <View style={s.container}>
            <PlayerText style={s.message} numberOfLines={1}>
                {MESSAGES[activeScreen]}
            </PlayerText>
            {activeScreen === 'tasks' && (
                <ProgressCircle completed={completed} total={total} />
            )}
        </View>
    );
}