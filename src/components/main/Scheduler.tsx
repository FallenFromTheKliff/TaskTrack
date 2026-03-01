import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { Task } from '@/contexts/TaskContext';
import { getTodayString, formatDateDisplay } from '@/utils/shared/dateUtils';
import { validateTitle, validateDescription, validateNotes } from '@/utils/auth/validationUtils';
import { PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_BG, PRIORITY_BORDER, PRIORITY_ICON_NAMES, DEFAULT_TASK_ICON } from '@/utils/shared/constantUtils';
import { makeSchedulerStyles } from '@/styles/components/main/SchedulerStyles';

import InputField from '@/components/fields/InputField';
import CalendarModal from '@/components/modals/CalendarModal';
import TaskIconModal, { formatIconName } from '@/components/modals/TaskIconModal';

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
export type SchedulerHandle = { submit: () => void; };
type SchedulerProps = {
    initialValues?: Partial<SchedulerValues>;
    onSubmit: (values: SchedulerValues) => Promise<void>;
    onValidChange: (isValid: boolean) => void;
};
type SchedulerFormData = { title: string; description: string; notes: string; };

const PRIORITY_VALUES: Task['priority'][] = ['low', 'medium', 'high'];

const Scheduler = forwardRef<SchedulerHandle, SchedulerProps>(function Scheduler(
    { initialValues, onSubmit, onValidChange }, ref
) {
    const { colors, activeIconColor } = useTheme();

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

    const { control, handleSubmit, formState: { errors }, watch } = useForm<SchedulerFormData>({
        defaultValues: {
            title: initialValues?.title ?? '',
            description: initialValues?.description ?? '',
            notes: initialValues?.notes ?? ''
        },
        mode: 'onChange'
    });

    const titleValue = watch('title');
    const descriptionValue = watch('description');

    const isDurationValid = useCallback(
        (dur: 'indefinite' | 'timed', ed: string) => dur === 'indefinite' || ed.length > 0,
        []
    );

    const hasRequiredFields = titleValue.trim().length > 0 && descriptionValue.trim().length > 0;

    useEffect(() => {
        onValidChange(hasRequiredFields && isDurationValid(durationType, endDate));
    }, [hasRequiredFields, durationType, endDate, isDurationValid, onValidChange]);

    useImperativeHandle(ref, () => ({
        submit: () => {
            handleSubmit(data => {
                if (!hasRequiredFields || !isDurationValid(durationType, endDate)) return;
                onSubmit({
                    title: data.title.trim(),
                    description: data.description.trim(),
                    notes: data.notes.trim(),
                    icon, priority, date, durationType, endDate
                });
            })();
        }
    }), [hasRequiredFields, icon, priority, date, durationType, endDate, isDurationValid, onSubmit]);

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
    const s = makeSchedulerStyles(colors, activeIconColor);

    return (
        <ScrollView
            style={s.scrollView}
            contentContainerStyle={s.scrollContent}
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
                placeholder="Any quick reminders?"
                validation={validateNotes}
                errors={errors}
                optional
                maxLength={50}
                schedulerStyle
            />
            <View style={s.fieldBlock}>
                <PlayerText style={s.fieldLabel}>Icon</PlayerText>
                <Pressable
                    style={[s.iconPickerButton, { borderColor: iconTouched ? activePriorityBorder : colors.borderSub }]}
                    onPress={() => setIsTaskIconOpen(true)}
                >
                    <View style={[s.iconPreview, { borderColor: activePriorityBorder, backgroundColor: activePriorityBg }]}>
                        <Ionicons name={icon as any} size={22} color={activePriorityColor} />
                    </View>
                    <PlayerText style={[s.iconPickerText, iconTouched && { color: colors.textSecondary }]}>
                        {iconTouched ? formatIconName(icon) : 'Tap to choose an icon'}
                    </PlayerText>
                    <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </Pressable>
            </View>
            <View style={s.fieldBlock}>
                <PlayerText style={s.fieldLabel}>Priority</PlayerText>
                <View style={s.priorityRow}>
                    {PRIORITY_VALUES.map(val => {
                        const isActive = priority === val;
                        return (
                            <Pressable
                                key={val}
                                style={[
                                    s.priorityButton,
                                    {
                                        borderColor: isActive ? PRIORITY_BORDER[val] : colors.borderSub,
                                        backgroundColor: isActive ? PRIORITY_BG[val] : colors.bgInputDark
                                    }
                                ]}
                                onPress={() => setPriority(val)}
                            >
                                <Ionicons name={PRIORITY_ICON_NAMES[val] as any} size={18} color={isActive ? PRIORITY_COLORS[val] : colors.textDisabled} />
                                <PlayerText style={[s.priorityLabel, { color: isActive ? PRIORITY_COLORS[val] : colors.textDisabled }]}>
                                    {PRIORITY_LABELS[val]}
                                </PlayerText>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
            <View style={s.fieldBlock}>
                <PlayerText style={s.fieldLabel}>Task Date</PlayerText>
                <Pressable style={s.dateButton} onPress={() => setIsDatePickerOpen(true)}>
                    <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
                    <PlayerText style={s.dateButtonText}>{formatDateDisplay(date)}</PlayerText>
                </Pressable>
            </View>
            <View style={s.fieldBlock}>
                <PlayerText style={s.fieldLabel}>Duration</PlayerText>
                <View style={s.durationRow}>
                    {(['indefinite', 'timed'] as const).map(type => {
                        const isActive = durationType === type;
                        return (
                            <Pressable
                                key={type}
                                style={[s.durationButton, isActive && s.durationButtonActive]}
                                onPress={() => handleDurationChange(type)}
                            >
                                <Ionicons
                                    name={type === 'indefinite' ? 'infinite-outline' : 'timer-outline'}
                                    size={16}
                                    color={isActive ? colors.textSecondary : colors.textDisabled}
                                />
                                <PlayerText style={[s.durationLabel, isActive && s.durationLabelActive]}>
                                    {type === 'indefinite' ? 'Indefinite' : 'Timed'}
                                </PlayerText>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
            {durationType === 'timed' && (
                <View style={s.fieldBlock}>
                    <PlayerText style={s.fieldLabel}>End Date</PlayerText>
                    <Pressable
                        style={[s.dateButton, !endDate && s.dateButtonEmpty]}
                        onPress={() => setIsEndDatePickerOpen(true)}
                    >
                        <Ionicons name="flag-outline" size={18} color={endDate ? colors.textSecondary : colors.textMuted} />
                        <PlayerText style={[s.dateButtonText, !endDate && s.dateButtonPlaceholder]}>
                            {endDate ? formatDateDisplay(endDate) : 'Select an end date'}
                        </PlayerText>
                    </Pressable>
                </View>
            )}
            <CalendarModal
                isVisible={isDatePickerOpen}
                selectedDate={dateTouched ? date : ''}
                onSelect={d => { handleStartDateChange(d); setIsDatePickerOpen(false); }}
                onClose={() => setIsDatePickerOpen(false)}
            />
            <CalendarModal
                isVisible={isEndDatePickerOpen}
                selectedDate={endDate}
                onSelect={d => { setEndDate(d); setIsEndDatePickerOpen(false); }}
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