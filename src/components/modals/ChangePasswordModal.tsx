import { useState, useEffect } from 'react';
import { View, Pressable, Animated, Modal, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from '@expo/vector-icons';
import { validatePassword, validateNewPassword, validatePasswordConfirmation } from '@/utils/auth/validationUtils';
import { useOverlayAnim } from '@/hooks/animations/useOverlayAnim';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useTimedMessage } from '@/hooks/auth/useTimedMessage';
import { usePanelAnim } from '@/hooks/animations/usePanelAnim';

import InputField from '@/components/fields/InputField';
import PasswordRequirements from '@/components/requirements/PasswordRequirements';
import styles from '@/styles/modals/ChangePasswordStyles';

type ChangePasswordModalProps = {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: (currentPassword: string, newPassword: string) => Promise<void>;
};
type ChangePasswordFormData = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

export default function ChangePasswordModal({ isVisible, onCancel, onConfirm }: ChangePasswordModalProps) {
    const { opacity: fadeAnim, scale: scaleAnim } = useOverlayAnim(isVisible);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
    const [newPasswordValue, setNewPasswordValue] = useState('');
    const [currentPasswordValue, setCurrentPasswordValue] = useState('');

    const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
    const { height: passRequirementsHeight, opacity: passRequirementsLight } = usePanelAnim({
        targetHeight: 210,
        visible: newPasswordValue.length > 0 && (isNewPasswordFocused || !isNewPasswordValid)
    });

    const [isLoading, setIsLoading] = useState(false);
    const loadingText = useLoadingText('SAVING', isLoading);
    const { message: errorText, showMessage: showError } = useTimedMessage();

    const { control, handleSubmit, formState: { errors }, watch, reset } = useForm<ChangePasswordFormData>({
        defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
        mode: 'onChange'
    });
    const newPassword = watch('newPassword');
    useEffect(() => {
        if (!isVisible) {
            reset();
            setNewPasswordValue('');
            setCurrentPasswordValue('');
            setIsNewPasswordValid(false);
        }
    }, [isVisible]);

    const canSubmit = isNewPasswordValid && !isLoading;
    const onSubmit = async (data: ChangePasswordFormData) => {
        if (!canSubmit) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 0));
        try {
            await Promise.all([
                onConfirm(data.currentPassword, data.newPassword),
                new Promise(resolve => setTimeout(resolve, 2000))
            ]);
            onCancel();
        } catch {
            showError('Current password is incorrect.');
        } finally {
            setIsLoading(false);
        }
    };
    const saveLabel = isLoading ? loadingText : (errorText || 'SAVE');

    return (
        <Modal visible={isVisible} transparent>
            <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                <View style={styles.modalBlur} />
                <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                        <InputField
                            control={control}
                            name="currentPassword"
                            label="Current Password"
                            placeholder="Enter your current password"
                            icon="lock-closed-outline"
                            validation={validatePassword}
                            errors={errors}
                            onChangeValue={setCurrentPasswordValue}
                            toggleVisibility={{ isVisible: isCurrentPasswordVisible, setIsVisible: setIsCurrentPasswordVisible }}
                        />
                        <InputField
                            control={control}
                            name="newPassword"
                            label="New Password"
                            placeholder="Enter your new password"
                            icon="key-outline"
                            validation={(value) => validateNewPassword(currentPasswordValue, value)}
                            errors={errors}
                            onChangeValue={setNewPasswordValue}
                            onFocusChange={setIsNewPasswordFocused}
                            showRedBorder={newPasswordValue.length > 0 && !isNewPasswordValid}
                            toggleVisibility={{ isVisible: isNewPasswordVisible, setIsVisible: setIsNewPasswordVisible }}
                        />
                        <Animated.View style={{ overflow: 'hidden', height: passRequirementsHeight, opacity: passRequirementsLight }}>
                            <PasswordRequirements password={newPasswordValue} onValidationChange={setIsNewPasswordValid} />
                        </Animated.View>
                        <InputField
                            control={control}
                            name="confirmNewPassword"
                            label="Confirm New Password"
                            placeholder="Re-enter your new password"
                            icon="lock-closed-outline"
                            validation={(value) => validatePasswordConfirmation(newPassword, value)}
                            errors={errors}
                            toggleVisibility={{ isVisible: isConfirmVisible, setIsVisible: setIsConfirmVisible }}
                        />
                        <View style={styles.actions}>
                            <Pressable style={styles.cancelButton} onPress={onCancel} disabled={isLoading}>
                                <PlayerText style={styles.cancelText}>Cancel</PlayerText>
                            </Pressable>
                            <Pressable
                                style={[styles.confirmButton, (!canSubmit && !errorText) && styles.confirmButtonDisabled]}
                                onPress={handleSubmit(onSubmit)}
                                disabled={!canSubmit}
                            >
                                <Ionicons
                                    name="checkmark-outline"
                                    size={18}
                                    color={(canSubmit || errorText) ? '#161C24' : '#4E5D6D'}
                                />
                                <PlayerText style={[styles.confirmText, (!canSubmit && !errorText) && styles.confirmTextDisabled]}>
                                    {saveLabel}
                                </PlayerText>
                            </Pressable>
                        </View>
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}