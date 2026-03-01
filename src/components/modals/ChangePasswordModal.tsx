import { useState } from 'react';
import { View, Modal, Pressable, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { validatePasswordWithEmail, validateNewPassword, validatePasswordConfirmation } from '@/utils/auth/validationUtils';
import { useTimedMessage } from '@/hooks/auth/useTimedMessage';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { makeChangePasswordStyles } from '@/styles/modals/ChangePasswordStyles';

import InputField from '@/components/fields/InputField';
import PasswordRequirements from '@/components/requirements/PasswordRequirements';

type FormData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

type ChangePasswordModalProps = {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: (currentPassword: string, newPassword: string) => Promise<void>;
};

export default function ChangePasswordModal({ isVisible, onCancel, onConfirm }: ChangePasswordModalProps) {
    const { colors } = useTheme();

    const [isCurrentVisible, setIsCurrentVisible] = useState(false);
    const [isNewVisible, setIsNewVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const { message: errorText, showMessage: showError } = useTimedMessage();
    const loadingText = useLoadingText('SAVING', isLoading);

    const { control, handleSubmit, formState: { errors, isValid }, reset, watch } = useForm<FormData>({
        defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
        mode: 'onChange'
    });
    const newPasswordValue = watch('newPassword');
    const canSubmit = isValid && isPasswordValid && !isLoading;

    const s = makeChangePasswordStyles(colors);

    const handleClose = () => { reset(); onCancel(); };

    const onSubmit = async (data: FormData) => {
        if (!canSubmit) return;
        setIsLoading(true);
        try {
            await onConfirm(data.currentPassword, data.newPassword);
            reset();
            onCancel();
        } catch {
            showError('Failed to update password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal visible={isVisible} transparent animationType="fade" onRequestClose={handleClose}>
            <View style={s.overlay}>
                <Pressable style={s.blur} onPress={handleClose} />
                <View style={s.container}>
                    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                        <PlayerText style={{ fontSize: 26, color: colors.textPrimary, marginBottom: 16 }}>
                            Change Password
                        </PlayerText>
                        <InputField
                            control={control}
                            name="currentPassword"
                            label="Current Password"
                            placeholder="Enter your current password"
                            icon="lock-closed-outline"
                            validation={validatePasswordWithEmail.bind(null, '')}
                            errors={errors}
                            editable={!isLoading}
                            toggleVisibility={{ isVisible: isCurrentVisible, setIsVisible: setIsCurrentVisible }}
                        />
                        <InputField
                            control={control}
                            name="newPassword"
                            label="New Password"
                            placeholder="Enter your new password"
                            icon="lock-open-outline"
                            validation={(v) => validateNewPassword('', v)}
                            errors={errors}
                            editable={!isLoading}
                            toggleVisibility={{ isVisible: isNewVisible, setIsVisible: setIsNewVisible }}
                        />
                        <PasswordRequirements password={newPasswordValue} onValidationChange={setIsPasswordValid} />
                        <InputField
                            control={control}
                            name="confirmPassword"
                            label="Confirm New Password"
                            placeholder="Re-enter your new password"
                            icon="shield-checkmark-outline"
                            validation={(v) => validatePasswordConfirmation(newPasswordValue, v)}
                            errors={errors}
                            editable={!isLoading}
                            toggleVisibility={{ isVisible: isConfirmVisible, setIsVisible: setIsConfirmVisible }}
                        />
                        {errorText ? (
                            <PlayerText style={{ fontSize: 14, color: colors.errorRed, marginTop: 8 }}>
                                {errorText}
                            </PlayerText>
                        ) : null}
                    </ScrollView>
                    <View style={s.actions}>
                        <Pressable style={s.cancelButton} onPress={handleClose} disabled={isLoading}>
                            <PlayerText style={s.cancelText}>Cancel</PlayerText>
                        </Pressable>
                        <Pressable
                            style={canSubmit ? s.confirmButton : s.confirmButtonDisabled}
                            onPress={handleSubmit(onSubmit)}
                            disabled={!canSubmit}
                        >
                            <Ionicons
                                name="checkmark-outline"
                                size={18}
                                color={canSubmit ? colors.bgDeep : colors.textDisabled}
                            />
                            <PlayerText style={canSubmit ? s.confirmText : s.confirmTextDisabled}>
                                {isLoading ? loadingText : 'Save Password'}
                            </PlayerText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}