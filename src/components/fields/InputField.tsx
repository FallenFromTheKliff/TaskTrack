import { View, Pressable } from 'react-native';
import { PlayerText, PlayerTextInput } from '@/components/fields/PlayerText';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import authStyles from '@/styles/auth/AuthStyles';
import schedulerStyles from '@/styles/main/SchedulerStyles';

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
};

const filterForKeyboard = (text: string, keyboardType: string) =>
    keyboardType === 'phone-pad' ? text.replace(/[^0-9]/g, '') : text;

export default function InputField({
    control,
    name,
    label,
    placeholder,
    icon,
    iconSize = 20,
    validation,
    errors,
    secureTextEntry = false,
    keyboardType = 'default',
    onChangeValue,
    onFocusChange,
    showRedBorder = false,
    editable = true,
    optional = false,
    multiline = false,
    maxLength,
    schedulerStyle = false,
    toggleVisibility
}: InputFieldProps) {
    const error = errors[name];
    const shouldShowRedBorder = editable && (!!error || showRedBorder);
    if (schedulerStyle) {
        return (
            <Controller
                control={control}
                name={name}
                rules={validation ? { validate: validation } : undefined}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={schedulerStyles.fieldBlock}>
                        <View style={schedulerStyles.fieldLabelRow}>
                            <PlayerText style={schedulerStyles.fieldLabel}>{label}</PlayerText>
                            {optional && (
                                <PlayerText style={schedulerStyles.fieldLabelOptional}>(optional)</PlayerText>
                            )}
                        </View>
                        <View style={[
                            schedulerStyles.inputBox,
                            multiline && schedulerStyles.textAreaBox,
                            shouldShowRedBorder && { borderColor: '#FF6B6B' }
                        ]}>
                            <PlayerTextInput
                                placeholder={placeholder}
                                onBlur={() => { onBlur(); onFocusChange?.(false); }}
                                onFocus={() => onFocusChange?.(true)}
                                onChangeText={(text) => {
                                    const filtered = filterForKeyboard(text, keyboardType);
                                    onChange(filtered);
                                    onChangeValue?.(filtered);
                                }}
                                value={value}
                                multiline={multiline}
                                style={multiline ? schedulerStyles.textArea : undefined}
                                keyboardType={keyboardType}
                                maxLength={maxLength}
                            />
                        </View>
                        {error && (
                            <PlayerText style={{ color: '#FF6B6B', fontSize: 10, marginLeft: 5, marginTop: 4 }}>
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
                    <PlayerText style={[authStyles.label, !editable && { color: '#4E5D6D' }]}>{label}</PlayerText>
                    <View style={[
                        authStyles.inputField,
                        !editable && { backgroundColor: '#252D36', borderColor: '#313B46' },
                        shouldShowRedBorder && { borderColor: '#FF6B6B' }
                    ]}>
                        {icon && (
                            <Ionicons
                                name={icon}
                                size={iconSize}
                                color={editable ? '#8EA7C1' : '#4E5D6D'}
                                style={{ marginRight: 10 }}
                            />
                        )}
                        <PlayerTextInput
                            placeholder={placeholder}
                            placeholderTextColor={editable ? '#6D8196' : '#4E5D6D'}
                            onBlur={() => { onBlur(); onFocusChange?.(false); }}
                            onFocus={() => onFocusChange?.(true)}
                            onChangeText={(text) => {
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
                            style={!editable ? { color: '#4E5D6D' } : undefined}
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
                                        color="#8EA7C1"
                                    />
                                </Pressable>
                            </View>
                        )}
                    </View>
                    <View style={authStyles.inputError}>
                        {error && editable && (
                            <PlayerText style={{ color: '#FF6B6B', fontSize: 10 }}>
                                {error.message as string}
                            </PlayerText>
                        )}
                    </View>
                </View>
            )}
        />
    );
}