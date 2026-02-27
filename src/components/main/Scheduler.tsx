import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { PlayerText } from '@/components/fields/PlayerText';
import { Task } from '@/contexts/TaskContext';
import { getTodayString, formatDateDisplay } from '@/utils/shared/dateUtils';
import { validateTitle, validateDescription, validateNotes } from '@/utils/auth/validationUtils';
import { PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_BG, PRIORITY_BORDER, PRIORITY_ICON_NAMES, DEFAULT_TASK_ICON } from '@/utils/shared/constantUtils';

import InputField from '@/components/fields/InputField';
import CalendarModal from '@/components/modals/CalendarModal';
import TaskIconModal, { formatIconName } from '@/components/modals/TaskIconModal';
import styles from '@/styles/main/SchedulerStyles';

export type SchedulerValues = {
    title: string;
    description: string;
    notes: string;
    icon: string;
    priority: Task['priority'];
    date: string;
    durationType: 'indefinite' | 'timed';
    endDate: string;
};
export type SchedulerHandle = {
    submit: () => void;
};
type SchedulerProps = {
    initialValues?: Partial<SchedulerValues>;
    onSubmit: (values: SchedulerValues) => Promise<void>;
    onValidChange: (isValid: boolean) => void;
    isLoading: boolean;
};
type SchedulerFormData = {
    title: string;
    description: string;
    notes: string;
};

const PRIORITY_VALUES: Task['priority'][] = ['low', 'medium', 'high'];

const Scheduler = forwardRef<SchedulerHandle, SchedulerProps>(function Scheduler(
    { initialValues, onSubmit, onValidChange, isLoading }, ref
) {
    const [icon, setIcon] = useState(initialValues?.icon ?? DEFAULT_TASK_ICON);
    const [priority, setPriority] = useState<Task['priority']>(initialValues?.priority ?? 'low');
    const [date, setDate] = useState(initialValues?.date ?? getTodayString());
    const [durationType, setDurationType] = useState<'indefinite' | 'timed'>(initialValues?.durationType ?? 'indefinite');
    const [endDate, setEndDate] = useState(initialValues?.endDate ?? '');
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
    const [isTaskIconOpen, setIsTaskIconOpen] = useState(false);
    const [iconTouched, setIconTouched] = useState(!!initialValues?.icon);
    const [dateTouched, setDateTouched] = useState(!!initialValues?.date);
    const { control, handleSubmit, formState: { errors, isValid: formIsValid } } = useForm<SchedulerFormData>({
        defaultValues: {
            title: initialValues?.title ?? '',
            description: initialValues?.description ?? '',
            notes: initialValues?.notes ?? ''
        },
        mode: 'onChange'
    });
    const checkDurationValid = (dur: 'indefinite' | 'timed', ed: string) =>
        dur === 'indefinite' || ed.length > 0;
    useEffect(() => {
        onValidChange(formIsValid && checkDurationValid(durationType, endDate));
    }, [formIsValid, durationType, endDate]);
    useImperativeHandle(ref, () => ({
        submit: () => {
            handleSubmit((data) => {
                if (!checkDurationValid(durationType, endDate)) return;
                onSubmit({
                    title: data.title.trim(),
                    description: data.description.trim(),
                    notes: data.notes.trim(),
                    icon,
                    priority,
                    date,
                    durationType,
                    endDate
                });
            })();
        }
    }), [icon, priority, date, durationType, endDate]);
    const handleDurationChange = (type: 'indefinite' | 'timed') => {
        setDurationType(type);
        if (type === 'indefinite') setEndDate('');
    };
    const handleStartDateChange = (d: string) => {
        setDate(d);
        setDateTouched(true);
        if (endDate && endDate <= d) setEndDate('');
    };
    const handleIconSelect = (selected: string) => {
        setIcon(selected);
        setIconTouched(true);
    };
    const activePriorityColor = PRIORITY_COLORS[priority];
    const activePriorityBg = PRIORITY_BG[priority];
    const activePriorityBorder = PRIORITY_BORDER[priority];
    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <InputField
                control={control}
                name="title"
                label="Title"
                placeholder="e.g., Finish project report"
                validation={validateTitle}
                errors={errors}
                maxLength={30}
                schedulerStyle
            />
            <InputField
                control={control}
                name="description"
                label="Description"
                placeholder="What does this task involve?"
                validation={validateDescription}
                errors={errors}
                multiline
                maxLength={200}
                schedulerStyle
            />
            <InputField
                control={control}
                name="notes"
                label="Notes"
                placeholder="Any quick reminders..."
                validation={validateNotes}
                errors={errors}
                optional
                maxLength={50}
                schedulerStyle
            />
            <View style={styles.fieldBlock}>
                <PlayerText style={styles.fieldLabel}>Icon</PlayerText>
                <Pressable
                    style={[styles.iconPickerButton, { borderColor: iconTouched ? activePriorityBorder : '#313B46' }]}
                    onPress={() => setIsTaskIconOpen(true)}
                >
                    <View style={[styles.iconPreview, { borderColor: activePriorityBorder, backgroundColor: activePriorityBg }]}>
                        <Ionicons name={icon as any} size={22} color={activePriorityColor} />
                    </View>
                    <PlayerText style={[styles.iconPickerText, iconTouched && { color: '#8EA7C1' }]}>
                        {iconTouched ? formatIconName(icon) : 'Tap to choose an icon'}
                    </PlayerText>
                    <Ionicons name="chevron-forward" size={16} color="#6D8196" />
                </Pressable>
            </View>
            <View style={styles.fieldBlock}>
                <PlayerText style={styles.fieldLabel}>Priority</PlayerText>
                <View style={styles.priorityRow}>
                    {PRIORITY_VALUES.map((value) => {
                        const isActive = priority === value;
                        const color = PRIORITY_COLORS[value];
                        const bg = PRIORITY_BG[value];
                        const border = PRIORITY_BORDER[value];
                        return (
                            <Pressable
                                key={value}
                                style={[styles.priorityButton, { borderColor: isActive ? border : '#313B46', backgroundColor: isActive ? bg : '#1E2832' }]}
                                onPress={() => setPriority(value)}
                            >
                                <Ionicons
                                    name={PRIORITY_ICON_NAMES[value] as any}
                                    size={18}
                                    color={isActive ? color : '#4E5D6D'}
                                />
                                <PlayerText style={[styles.priorityLabel, { color: isActive ? color : '#4E5D6D' }]}>
                                    {PRIORITY_LABELS[value]}
                                </PlayerText>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
            <View style={styles.fieldBlock}>
                <PlayerText style={styles.fieldLabel}>Task Date</PlayerText>
                <Pressable style={styles.dateButton} onPress={() => setIsDatePickerOpen(true)}>
                    <Ionicons name="calendar-outline" size={18} color="#8EA7C1" />
                    <PlayerText style={styles.dateButtonText}>{formatDateDisplay(date)}</PlayerText>
                </Pressable>
            </View>
            <View style={styles.fieldBlock}>
                <PlayerText style={styles.fieldLabel}>Duration</PlayerText>
                <View style={styles.durationRow}>
                    {(['indefinite', 'timed'] as const).map((type) => {
                        const isActive = durationType === type;
                        return (
                            <Pressable
                                key={type}
                                style={[styles.durationButton, isActive && styles.durationButtonActive]}
                                onPress={() => handleDurationChange(type)}
                            >
                                <Ionicons
                                    name={type === 'indefinite' ? 'infinite-outline' : 'timer-outline'}
                                    size={16}
                                    color={isActive ? '#8EA7C1' : '#4E5D6D'}
                                />
                                <PlayerText style={[styles.durationLabel, isActive && styles.durationLabelActive]}>
                                    {type === 'indefinite' ? 'Indefinite' : 'Timed'}
                                </PlayerText>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
            {durationType === 'timed' && (
                <View style={styles.fieldBlock}>
                    <PlayerText style={styles.fieldLabel}>End Date</PlayerText>
                    <Pressable
                        style={[styles.dateButton, !endDate && styles.dateButtonEmpty]}
                        onPress={() => setIsEndDatePickerOpen(true)}
                    >
                        <Ionicons name="flag-outline" size={18} color={endDate ? '#8EA7C1' : '#6D8196'} />
                        <PlayerText style={[styles.dateButtonText, !endDate && styles.dateButtonPlaceholder]}>
                            {endDate ? formatDateDisplay(endDate) : 'Select an end date'}
                        </PlayerText>
                    </Pressable>
                </View>
            )}
            <CalendarModal
                isVisible={isDatePickerOpen}
                selectedDate={dateTouched ? date : ''}
                onDateSelect={(d) => { handleStartDateChange(d); setIsDatePickerOpen(false); }}
                onClose={() => setIsDatePickerOpen(false)}
            />
            <CalendarModal
                isVisible={isEndDatePickerOpen}
                selectedDate={endDate}
                onDateSelect={(d) => { setEndDate(d); setIsEndDatePickerOpen(false); }}
                onClose={() => setIsEndDatePickerOpen(false)}
                minDate={date}
                blockToday
                onReset={() => setEndDate('')}
            />
            <TaskIconModal
                isVisible={isTaskIconOpen}
                selectedIcon={icon}
                priority={priority}
                onSelect={handleIconSelect}
                onClose={() => setIsTaskIconOpen(false)}
            />
        </ScrollView>
    );
});

export default Scheduler;