import { useState, useRef } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useScreen } from '@/contexts/ScreenContext';
import { PlayerText } from '@/components/fields/forms/PlayerText';
import { validateUsername, validateFullName, validateEmail, validatePhoneNumber } from '@/utils/auth/validationUtils';
import { capitalizeFullName } from '@/utils/auth/revisionUtils';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useTimedMessage } from '@/hooks/auth/useTimedMessage';
import { usePanelAnim } from '@/hooks/animations/usePanelAnim';
import { parseBirthday, composeBirthday, MONTH_NAMES_FULL, DAYS, YEARS } from '@/utils/shared/dateUtils';
import { pickImageFromLibrary } from '@/utils/auth/imageUtils';
import { useEntranceAnim } from '@/hooks/animations/useEntranceAnim';
import { makeProfileSectionStyles } from '@/styles/screens/sections/ProfileSectionStyles';

import InputField from '@/components/fields/forms/InputField';
import BirthdayDropdown from '@/components/fields/common/BirthdayDropdown';
import GenderSwap from '@/components/fields/common/GenderSwap';
import ProfileAvatar from '@/components/fields/common/ProfileAvatar';
import PasswordField from '@/components/fields/common/PasswordField';
import NameRequirements from '@/components/requirements/NameRequirements';
import PlayerButton from '@/components/fields/forms/PlayerButton';
import ChangePasswordModal from '@/components/modals/ChangePasswordModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import SelfieCameraModal from '@/components/modals/SelfieCameraModal';

type ProfileFormData = {
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
};

export default function ProfileSection() {
    const { user, updateProfile, deleteUser, verifyAndChangePassword, logout } = useAuth();
    const { colors, activeIconColor, resetAppearance } = useTheme();
    const { setActiveScreen } = useScreen();
    const styles = makeProfileSectionStyles(colors, activeIconColor);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [profilePictureUri, setProfilePictureUri] = useState<string | null>(user?.profilePicture ?? null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const passwordChanged = useRef(false);
    const [isTerminating, setIsTerminating] = useState(false);
    const [isSecurityLogout, setIsSecurityLogout] = useState(false);
    const [isTerminateVisible, setIsTerminateVisible] = useState(false);
    const [isSecurityVisible, setIsSecurityVisible] = useState(false);
    const pendingSubmitData = useRef<ProfileFormData | null>(null);

    const { message: errorText, showMessage: showError } = useTimedMessage(2000);

    const dob = parseBirthday(user?.dateOfBirth);
    const [birthdayMonth, setBirthdayMonth] = useState(dob.month);
    const [birthdayDay, setBirthdayDay] = useState(dob.day);
    const [birthdayYear, setBirthdayYear] = useState(dob.year);
    const [gender, setGender] = useState(user?.gender || '');
    const [fullNameValue, setFullNameValue] = useState(user?.fullName || '');
    const [isFullNameValid, setIsFullNameValid] = useState(false);
    const [isFullNameFocused, setIsFullNameFocused] = useState(false);
    const [nameRequirementsShown, setNameRequirementsShown] = useState(false);

    const showNameRequirements = isEditing && nameRequirementsShown;
    const { height: nameRequirementsHeight, opacity: nameRequirementsOpacity } = usePanelAnim({
        targetHeight: 180,
        visible: showNameRequirements && isFullNameFocused
    });

    const formDefaults = {
        userName: user?.userName || '',
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || ''
    };

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProfileFormData>({
        defaultValues: formDefaults,
        mode: 'onChange'
    });

    const loadingText = useLoadingText('SAVING', isLoading);
    const { translateY, opacity } = useEntranceAnim();

    const handleFullNameChange = (value: string) => {
        setFullNameValue(value);
        if (!nameRequirementsShown && value.length > 0) setNameRequirementsShown(true);
    };
    const handleFullNameFocusChange = (isFocused: boolean) => {
        setIsFullNameFocused(isFocused);
        if (!isFocused && fullNameValue.length > 0) {
            const formatted = capitalizeFullName(fullNameValue);
            setFullNameValue(formatted);
            setValue('fullName', formatted);
        }
    };
    const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
        await verifyAndChangePassword(currentPassword, newPassword);
        passwordChanged.current = true;
        setIsPasswordModalOpen(false);
    };

    const pickExistingPhoto = async () => {
        const uri = await pickImageFromLibrary();
        if (uri) setProfilePictureUri(uri);
    };

    const onSubmit = async (data: ProfileFormData) => {
        const hasSecurityChange = data.email !== user?.email || passwordChanged.current;
        if (hasSecurityChange) {
            pendingSubmitData.current = data;
            setIsSecurityVisible(true);
            return;
        }
        await onSave(data);
    };
    const onSave = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            await updateProfile({
                userName: data.userName,
                fullName: capitalizeFullName(data.fullName),
                email: data.email,
                phoneNumber: data.phoneNumber,
                dateOfBirth: composeBirthday(birthdayMonth, birthdayDay, birthdayYear),
                gender,
                profilePicture: profilePictureUri
            });
            setIsEditing(false);
            setNameRequirementsShown(false);
            setIsFullNameFocused(false);
            passwordChanged.current = false;
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 1500);
        } catch {
            showError('Failed to save. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setNameRequirementsShown(false);
        setIsFullNameFocused(false);
        reset(formDefaults);
        setProfilePictureUri(user?.profilePicture ?? null);
        setFullNameValue(user?.fullName || '');
        setBirthdayMonth(dob.month);
        setBirthdayDay(dob.day);
        setBirthdayYear(dob.year);
        setGender(user?.gender || '');
        passwordChanged.current = false;
    };

    const handleSecurityConfirm = async () => {
        if (pendingSubmitData.current) {
            setIsSecurityLogout(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            setActiveScreen('tasks');
            await onSave(pendingSubmitData.current);
            await logout();
        }
    };
    const handleTerminateConfirm = async () => {
        try {
            setIsTerminating(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            setActiveScreen('tasks');
            resetAppearance();
            await deleteUser();
        } catch {
            setIsTerminating(false);
            setIsTerminateVisible(false);
            showError('Failed to terminate account. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View style={{ flex: 1, transform: [{ translateY }], opacity }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <ProfileAvatar
                        profilePictureUri={profilePictureUri}
                        onPickPhoto={pickExistingPhoto}
                        disabled={!isEditing}
                        renderBottom={() => isEditing
                            ? <PlayerButton variant="action" label="Take a Picture" onPress={() => setIsCameraOpen(true)} icon="camera-outline" iconSize={16} />
                            : <PlayerText style={{ fontSize: 13, color: activeIconColor ?? colors.accentBlue }}>Display Picture</PlayerText>
                        }
                    />
                    <View style={styles.form}>
                        <InputField
                            control={control}
                            name="userName"
                            label="Username"
                            placeholder="e.g., _kLIFF23"
                            icon="person-outline"
                            validation={validateUsername}
                            errors={errors}
                            editable={isEditing}
                        />
                        <InputField
                            control={control}
                            name="fullName"
                            label="Full Name"
                            placeholder="e.g., Tony Stark"
                            icon="person-circle-outline"
                            validation={validateFullName}
                            errors={errors}
                            editable={isEditing}
                            onChangeValue={handleFullNameChange}
                            onFocusChange={handleFullNameFocusChange}
                            showRedBorder={showNameRequirements && isFullNameFocused && !isFullNameValid}
                        />
                        <Animated.View style={{ overflow: 'hidden', height: nameRequirementsHeight, opacity: nameRequirementsOpacity }}>
                            <NameRequirements fullName={fullNameValue} onValidationChange={setIsFullNameValid} />
                        </Animated.View>
                        <InputField
                            control={control}
                            name="email"
                            label="Email Address"
                            placeholder="e.g., canopy2@example.com"
                            icon="mail-outline"
                            validation={validateEmail}
                            errors={errors}
                            keyboardType="email-address"
                            editable={isEditing}
                        />
                        <InputField
                            control={control}
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="e.g., 09123456789"
                            icon="call-outline"
                            maxLength={11}
                            validation={validatePhoneNumber}
                            errors={errors}
                            keyboardType="phone-pad"
                            editable={isEditing}
                        />
                        <View style={styles.fieldBlock}>
                            <PlayerText style={[styles.fieldLabel, !isEditing && { color: colors.textDisabled }]}>Gender</PlayerText>
                            <GenderSwap value={gender} isEditable={isEditing} onSelect={setGender} />
                        </View>
                        <View style={[styles.fieldBlock, { zIndex: 200 }]}>
                            <PlayerText style={[styles.fieldLabel, !isEditing && { color: colors.textDisabled }]}>Date of Birth</PlayerText>
                            <View style={styles.birthdayRow}>
                                <BirthdayDropdown label="Month" value={birthdayMonth} options={MONTH_NAMES_FULL} isEditable={isEditing} onSelect={setBirthdayMonth} />
                                <BirthdayDropdown label="Day" value={birthdayDay} options={DAYS} isEditable={isEditing} onSelect={setBirthdayDay} />
                                <BirthdayDropdown label="Year" value={birthdayYear} options={YEARS} isEditable={isEditing} onSelect={setBirthdayYear} />
                            </View>
                        </View>
                        <PasswordField isEditing={isEditing} onPress={() => setIsPasswordModalOpen(true)} />
                    </View>
                    <View style={[styles.actionBar, { zIndex: 150 }]}>
                        {!isEditing ? (
                            <>
                                <PlayerButton
                                    variant={errorText ? 'danger' : 'primary'}
                                    label={errorText || (isSaved ? 'SAVED' : 'EDIT PROFILE')}
                                    onPress={() => { if (!errorText && !isSaved) setIsEditing(true); }}
                                    icon={errorText ? 'alert-circle-outline' : isSaved ? 'checkmark-outline' : 'pencil-outline'}
                                    disabled={isSaved || !!errorText}
                                />
                                <PlayerButton
                                    variant="danger"
                                    label="TERMINATE ACCOUNT"
                                    onPress={() => setIsTerminateVisible(true)}
                                    icon="skull-outline"
                                />
                            </>
                        ) : (
                            <View style={styles.editingButtons}>
                                <PlayerButton variant="ghost" label="Cancel" onPress={handleCancelEdit} flex={1} />
                                <PlayerButton
                                    variant={errorText ? 'danger' : 'primary'}
                                    label={isLoading ? loadingText : (errorText || 'Save Changes')}
                                    onPress={handleSubmit(onSubmit)}
                                    disabled={isLoading || !!errorText}
                                    flex={2}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </Animated.View>
            <ChangePasswordModal isVisible={isPasswordModalOpen} onCancel={() => setIsPasswordModalOpen(false)} onConfirm={handlePasswordChange} />
            <ConfirmModal
                isVisible={isSecurityVisible}
                title="Important Change(s) Detected."
                message="Your account had its email or password changed. You will be logged out and must sign back in after saving changes."
                yesLabel="I UNDERSTAND"
                noLabel="CANCEL"
                yesIcon="shield-checkmark-outline"
                yesPositive
                isLoading={isSecurityLogout}
                loadingLabel="LOGGING OUT"
                loadingTitle="Alright, see ya later!"
                onNo={() => setIsSecurityVisible(false)}
                onYes={handleSecurityConfirm}
            />
            <ConfirmModal
                isVisible={isTerminateVisible}
                title="Terminate Account?"
                message="This will permanently delete your account and all your tasks. This action cannot be undone."
                yesLabel="TERMINATE"
                noLabel="CANCEL"
                yesIcon="skull-outline"
                yesDestructive
                isLoading={isTerminating}
                loadingLabel="TERMINATING"
                loadingTitle="Well then, be seeing you!"
                onNo={() => setIsTerminateVisible(false)}
                onYes={handleTerminateConfirm}
            />
            <SelfieCameraModal
                isVisible={isCameraOpen}
                onCancel={() => setIsCameraOpen(false)}
                onCapture={(uri) => { setProfilePictureUri(uri); setIsCameraOpen(false); }}
            />
        </View>
    );
}