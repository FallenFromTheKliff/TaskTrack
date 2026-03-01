import { useRef, useState, useEffect, useCallback } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTask, Task } from '@/contexts/TaskContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuthEntrance } from '@/hooks/auth/useAuthEntrance';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { makeFormStyles } from '@/styles/components/main/FormStyles';

import Scheduler, { SchedulerHandle, SchedulerValues } from '@/components/main/Scheduler';

type TaskFormProps = {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<{ 'Task Details': { task?: Task } }, 'Task Details'>;
};

export default function TaskFormScreen({ navigation, route }: TaskFormProps) {
    const { createTask, updateTask, recordEditEvent } = useTask();
    const { colors, activeIconColor } = useTheme();
    const { fadeIn } = useAuthEntrance();

    const task = route.params?.task;
    const isEditing = !!task;

    const schedulerRef = useRef<SchedulerHandle>(null);
    const pendingSubmit = useRef(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const disabled = !canSubmit || isLoading;
    const s = makeFormStyles(colors, isEditing, disabled, activeIconColor);

    const loadingText = useLoadingText(isEditing ? 'UPDATING' : 'CREATING', isLoading);
    const buttonLabel = isLoading ? loadingText : (isEditing ? 'UPDATE TASK' : 'CREATE TASK');

    useEffect(() => {
        if (isLoading && pendingSubmit.current) {
            pendingSubmit.current = false;
            schedulerRef.current?.submit();
        }
    }, [isLoading]);

    const handleSubmitPress = () => {
        if (disabled) return;
        pendingSubmit.current = true;
        setIsLoading(true);
    };

    const onSubmit = useCallback(async (values: SchedulerValues) => {
        try {
            if (isEditing && task) {
                await updateTask(task.id, {
                    title: values.title,
                    description: values.description,
                    notes: values.notes,
                    icon: values.icon,
                    priority: values.priority,
                    date: values.date,
                    duration: values.durationType === 'timed' ? { type: 'timed', endDate: values.endDate } : { type: 'indefinite' }
                });
                await recordEditEvent({ ...task, title: values.title, description: values.description, notes: values.notes });
            } else {
                await createTask({
                    title: values.title,
                    description: values.description,
                    notes: values.notes,
                    icon: values.icon,
                    priority: values.priority,
                    date: values.date,
                    completed: false,
                    duration: values.durationType === 'timed' ? { type: 'timed', endDate: values.endDate } : { type: 'indefinite' }
                });
            }
            setTimeout(() => navigation.replace('Home'), 2000);
        } catch {
            setIsLoading(false);
        }
    }, [isEditing, task, updateTask, recordEditEvent, createTask, navigation]);

    const initialValues: Partial<SchedulerValues> | undefined = task ? {
        title: task.title,
        description: task.description,
        notes: task.notes ?? '',
        icon: task.icon ?? '',
        priority: task.priority,
        date: task.date,
        durationType: task.duration.type,
        endDate: task.duration.type === 'timed' ? (task.duration.endDate ?? '') : ''
    } : undefined;

    return (
        <View style={s.container}>
            <View style={s.topBar}>
                <Pressable style={s.backButton} onPress={() => navigation.goBack()} disabled={isLoading}>
                    <Ionicons name="arrow-back" size={24} color={isLoading ? colors.textDisabled : colors.textPrimary} />
                </Pressable>
                <PlayerText style={s.screenTitle}>{isEditing ? 'Edit Task' : 'New Task'}</PlayerText>
            </View>
            <Animated.View style={[s.scrollArea, { opacity: fadeIn }]}>
                <Scheduler
                    ref={schedulerRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onValidChange={setCanSubmit}
                />
            </Animated.View>
            <View style={s.footer}>
                <Pressable style={s.submitButton} onPress={handleSubmitPress} disabled={disabled}>
                    <Ionicons
                        name={isEditing ? 'create-outline' : 'checkmark-circle-outline'}
                        size={22}
                        color={disabled ? colors.textDisabled : isEditing ? (activeIconColor ?? colors.accentBlue) : colors.accentGreen}
                    />
                    <PlayerText style={s.submitText}>{buttonLabel}</PlayerText>
                </Pressable>
            </View>
        </View>
    );
}