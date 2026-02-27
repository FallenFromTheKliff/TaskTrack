import { useState, useRef, useEffect } from 'react';
import { View, Pressable, Animated, BackHandler } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { PlayerText } from '@/components/fields/PlayerText';
import { useTask, Task } from '@/contexts/TaskContext';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { DEFAULT_TASK_ICON } from '@/utils/shared/constantUtils';

import Scheduler, { SchedulerValues, SchedulerHandle } from '@/components/main/Scheduler';
import styles from '@/styles/main/FormStyles';

type TaskFormScreenProps = {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<{ params: { task?: Task } }, 'params'>;
};

export default function TaskFormScreen({ navigation, route }: TaskFormScreenProps) {
    const existingTask = route.params?.task ?? null;
    const isEditing = !!existingTask;
    const { createTask, updateTask, recordEditEvent } = useTask();
    const [isValid, setIsValid] = useState(isEditing);
    const [isLoading, setIsLoading] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const schedulerRef = useRef<SchedulerHandle>(null);
    const loadingText = useLoadingText(isEditing ? 'UPDATING TASK' : 'CREATING TASK', isLoading);

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    }, []);
    useEffect(() => {
        const sub = BackHandler.addEventListener('hardwareBackPress', () => isLoading);
        return () => sub.remove();
    }, [isLoading]);
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: !isLoading });
    }, [isLoading]);

    const handleSubmit = async (values: SchedulerValues) => {
        if (!isValid || isLoading) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 0));
        try {
            if (isEditing) {
                await Promise.all([
                    updateTask(existingTask.id, {
                        title: values.title,
                        description: values.description,
                        notes: values.notes,
                        icon: values.icon,
                        priority: values.priority,
                        date: values.date,
                        duration: values.durationType === 'timed' ? { type: 'timed', endDate: values.endDate } : { type: 'indefinite' }
                    }).then(() => recordEditEvent({ ...existingTask, title: values.title, description: values.description })),
                    new Promise(resolve => setTimeout(resolve, 2000))
                ]);
            } else {
                await Promise.all([
                    createTask({
                        title: values.title,
                        description: values.description,
                        notes: values.notes,
                        icon: values.icon,
                        date: values.date,
                        completed: false,
                        priority: values.priority,
                        duration: values.durationType === 'timed' ? { type: 'timed', endDate: values.endDate } : { type: 'indefinite' }
                    }),
                    new Promise(resolve => setTimeout(resolve, 2000))
                ]);
            }
            setIsLoading(false);
            navigation.replace('Home');
        } catch {
            setIsLoading(false);
        }
    };
    const disabled = !isValid || isLoading;
    const btnStyle = [
        styles.submitButton,
        isEditing && styles.submitButtonUpdate,
        disabled && styles.submitButtonDisabled
    ];
    const txtStyle = [
        styles.submitText,
        isEditing && styles.submitTextUpdate,
        disabled && styles.submitTextDisabled
    ];
    const iconColor = disabled ? '#4E5D6D' : isEditing ? '#7BAFD4' : '#6DC48A';
    const iconName = isEditing ? 'pencil-outline' : 'checkmark-circle-outline';
    const label = isLoading ? loadingText : isEditing ? 'UPDATE TASK' : 'CREATE TASK';

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()} disabled={isLoading}>
                    <Ionicons name="arrow-back" size={26} color={isLoading ? '#4E5D6D' : '#BFCDDC'} />
                </Pressable>
                <PlayerText style={styles.screenTitle}>
                    {isEditing ? 'Edit Task' : 'New Task'}
                </PlayerText>
            </View>
            <Animated.View style={[styles.scrollArea, { opacity: fadeAnim }]}>
                <Scheduler
                    ref={schedulerRef}
                    initialValues={isEditing ? {
                        title: existingTask.title,
                        description: existingTask.description,
                        notes: existingTask.notes ?? '',
                        icon: existingTask.icon ?? DEFAULT_TASK_ICON,
                        priority: existingTask.priority,
                        date: existingTask.date,
                        durationType: existingTask.duration.type,
                        endDate: existingTask.duration.endDate ?? ''
                    } : undefined}
                    onSubmit={handleSubmit}
                    onValidChange={setIsValid}
                    isLoading={isLoading}
                />
            </Animated.View>
            <View style={styles.footer}>
                <Pressable style={btnStyle} onPress={() => schedulerRef.current?.submit()} disabled={disabled}>
                    <Ionicons name={iconName} size={20} color={iconColor} />
                    <PlayerText style={txtStyle}>{label}</PlayerText>
                </Pressable>
            </View>
        </View>
    );
}