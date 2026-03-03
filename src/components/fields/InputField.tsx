import { View, Pressable } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText, PlayerTextInput } from '@/components/fields/PlayerText';
import { useTheme, ThemeColors } from '@/contexts/ThemeContext';
import { makeInputFieldStyles } from '@/styles/components/fields/InputFieldStyles';

type InputFieldProps = {
    control: Control<any>;
    name: string;
    label: string;
    placeholder: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconSize?: number;
    validation?: (value: any) => string | boolean | Promise<string | boolean>;
    errors: FieldErrors;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    onChangeValue?: (value: string) => void;
    onFocusChange?: (isFocused: boolean) => void;
    showRedBorder?: boolean;
    editable?: boolean;
    optional?: boolean;
    multiline?: boolean;
    maxLength?: number;
    schedulerStyle?: boolean;
    toggleVisibility?: {
        isVisible: boolean;
        setIsVisible: (value: boolean) => void;
    };
    colorsOverride?: ThemeColors;
    iconColorOverride?: string | null;
};

const filterForKeyboard = (text: string, keyboardType: string) =>
    keyboardType === 'phone-pad' ? text.replace(/[^0-9]/g, '') : text;

export default function InputField({
    control, name, label, placeholder, icon, iconSize = 20, validation, errors,
    secureTextEntry = false, keyboardType = 'default', onChangeValue, onFocusChange,
    showRedBorder = false, editable = true, optional = false, multiline = false,
    maxLength, schedulerStyle = false, toggleVisibility,
    colorsOverride, iconColorOverride
}: InputFieldProps) {
    const theme = useTheme();
    const colors = colorsOverride ?? theme.colors;
    const activeIconColor = iconColorOverride !== undefined ? iconColorOverride : theme.activeIconColor;
    const s = makeInputFieldStyles(colors, activeIconColor);
    const error = errors[name];
    const shouldShowRedBorder = editable && (!!error || showRedBorder);

    if (schedulerStyle) {
        return (
            <Controller
                control={control}
                name={name}
                rules={validation ? { validate: validation } : undefined}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={s.schedulerFieldBlock}>
                        <View style={s.schedulerFieldLabelRow}>
                            <PlayerText style={s.schedulerFieldLabel}>{label}</PlayerText>
                            {optional && (
                                <PlayerText style={s.schedulerFieldLabelOptional}>(optional)</PlayerText>
                            )}
                        </View>
                        <View style={[
                            s.schedulerInputBox,
                            { backgroundColor: colors.bgPanel, borderColor: colors.borderSub },
                            multiline && s.schedulerTextAreaBox,
                            shouldShowRedBorder && { borderColor: colors.errorRed }
                        ]}>
                            <PlayerTextInput
                                placeholder={placeholder}
                                onBlur={() => { onBlur(); onFocusChange?.(false); }}
                                onFocus={() => onFocusChange?.(true)}
                                onChangeText={text => {
                                    const filtered = filterForKeyboard(text, keyboardType);
                                    onChange(filtered);
                                    onChangeValue?.(filtered);
                                }}
                                value={value}
                                multiline={multiline}
                                style={multiline ? s.schedulerTextArea : undefined}
                                keyboardType={keyboardType}
                                maxLength={maxLength}
                            />
                        </View>
                        {error && (
                            <PlayerText style={[s.errorText, { color: colors.errorRed }]}>
                                {error.message as string}
                            </PlayerText>
                        )}
                    </View>
                )}
            />
        );
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={validation ? { validate: validation } : undefined}
            render={({ field: { onChange, onBlur, value } }) => (
                <View>
                    <PlayerText style={[s.label, { color: editable ? (activeIconColor ?? colors.accentBlue) : colors.textDisabled }]}>
                        {label}
                    </PlayerText>
                    <View style={[
                        s.inputField,
                        {
                            backgroundColor: editable ? colors.fieldBg : colors.fieldDisabledBg,
                            borderColor: editable ? colors.fieldBorder : colors.fieldDisabledBorder
                        },
                        shouldShowRedBorder && { borderColor: colors.errorRed }
                    ]}>
                        {icon && (
                            <Ionicons
                                name={icon}
                                size={iconSize}
                                color={editable ? colors.textSecondary : colors.textDisabled}
                                style={{ marginRight: 10 }}
                            />
                        )}
                        <PlayerTextInput
                            placeholder={placeholder}
                            placeholderTextColor={editable ? colors.textMuted : colors.textDisabled}
                            onBlur={() => { onBlur(); onFocusChange?.(false); }}
                            onFocus={() => onFocusChange?.(true)}
                            onChangeText={text => {
                                const filtered = filterForKeyboard(text, keyboardType);
                                onChange(filtered);
                                onChangeValue?.(filtered);
                            }}
                            value={value}
                            secureTextEntry={toggleVisibility ? !toggleVisibility.isVisible : secureTextEntry}
                            keyboardType={keyboardType}
                            editable={editable}
                            maxLength={maxLength}
                            multiline={multiline}
                            style={{ color: editable ? colors.textPrimary : colors.textDisabled }}
                        />
                        {toggleVisibility && editable && (
                            <View onStartShouldSetResponder={() => true}>
                                <Pressable
                                    onPress={() => toggleVisibility.setIsVisible(!toggleVisibility.isVisible)}
                                    style={{ marginLeft: 5, padding: 5 }}
                                >
                                    <Ionicons
                                        name={toggleVisibility.isVisible ? 'eye-off-outline' : 'eye-outline'}
                                        size={18}
                                        color={colors.textSecondary}
                                    />
                                </Pressable>
                            </View>
                        )}
                    </View>
                    <View style={s.inputError}>
                        {error && editable && (
                            <PlayerText style={[s.errorText, { color: colors.errorRed }]}>
                                {error.message as string}
                            </PlayerText>
                        )}
                    </View>
                </View>
            )}
        />
    );
}