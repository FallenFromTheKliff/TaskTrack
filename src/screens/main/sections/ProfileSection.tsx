import { useState, useRef } from 'react';
import { View, Pressable, ScrollView, Image, Animated } from 'react-native';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useScreen } from '@/contexts/ScreenContext';
import { validateUsername, validateFullName, validateEmail, validatePhoneNumber } from '@/utils/auth/validationUtils';
import { capitalizeFullName } from '@/utils/auth/revisionUtils';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useTimedMessage } from '@/hooks/auth/useTimedMessage';
import { usePanelAnim } from '@/hooks/animations/usePanelAnim';
import { parseBirthday, composeBirthday, MONTH_NAMES_FULL, DAYS, YEARS } from '@/utils/shared/dateUtils';
import { getProfileImageSource, pickImageFromLibrary } from '@/utils/auth/imageUtils';
import { useEntranceAnim } from '@/hooks/animations/useEntranceAnim';
import { makeProfileSectionStyles } from '@/styles/components/main/ProfileSectionStyles';

import InputField from '@/components/fields/InputField';
import BirthdayDropdown from '@/components/fields/BirthdayDropdown';
import GenderSwap from '@/components/fields/GenderSwap';
import NameRequirements from '@/components/requirements/NameRequirements';
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
    const { colors, activeIconColor } = useTheme();
    const { setActiveScreen } = useScreen();
    const { setAppearance } = useTheme();
    const styles = makeProfileSectionStyles(colors, activeIconColor);
    const [isLoading, setIsLoading] = useState(false);

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

    const { message: successText, showMessage: showSuccess } = useTimedMessage(2000);
    const { message: errorText, showMessage: showError } = useTimedMessage(2000);

    const dob = parseBirthday(user?.dateOfBirth);
    const [birthdayMonth, setBirthdayMonth] = useState(dob.month);
    const [birthdayDay, setBirthdayDay] = useState(dob.day);
    const [birthdayYear, setBirthdayYear] = useState(dob.year);
    const [gender, setGender] = useState(user?.gender || '');
    const [fullNameValue, setFullNameValue] = useState(user?.fullName || '');
    const [isFullNameValid, setIsFullNameValid] = useState(false);

    const [nameRequirementsShown, setNameRequirementsShown] = useState(false);
    const showNameRequirements = isEditing && nameRequirementsShown;
    const { height: nameRequirementsHeight, opacity: nameRequirementsOpacity } = usePanelAnim({
        targetHeight: 180,
        visible: showNameRequirements
    });

    const { control, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
        defaultValues: {
            userName: user?.userName || '',
            fullName: user?.fullName || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || ''
        },
        mode: 'onChange'
    });

    const loadingText = useLoadingText('SAVING', isLoading);
    const { translateY, opacity } = useEntranceAnim();

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNameRequirementsShown(false);
        reset({
            userName: user?.userName || '',
            fullName: user?.fullName || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || ''
        });
        setProfilePictureUri(user?.profilePicture ?? null);
        setFullNameValue(user?.fullName || '');
        setBirthdayMonth(dob.month);
        setBirthdayDay(dob.day);
        setBirthdayYear(dob.year);
        setGender(user?.gender || '');
        passwordChanged.current = false;
    };

    const handleFullNameChange = (value: string) => {
        setFullNameValue(value);
        if (!nameRequirementsShown && value.length > 0) setNameRequirementsShown(true);
    };

    const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
        try {
            await verifyAndChangePassword(currentPassword, newPassword);
            passwordChanged.current = true;
            setIsPasswordModalOpen(false);
            showSuccess('Password updated.');
        } catch (err: any) {
            throw err;
        }
    };

    const pickExistingPhoto = async () => {
        const uri = await pickImageFromLibrary();
        if (uri) setProfilePictureUri(uri);
    };

    const onSubmit = async (data: ProfileFormData) => {
        const hasEmailChange = data.email !== user?.email;
        const hasSecurityChange = hasEmailChange || passwordChanged.current;
        if (hasSecurityChange) {
            pendingSubmitData.current = data;
            setIsSecurityVisible(true);
            return;
        }
        await doSave(data);
    };

    const doSave = async (data: ProfileFormData) => {
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
            passwordChanged.current = false;
            showSuccess('Profile saved!');
        } catch {
            showError('Failed to save. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSecurityConfirm = async () => {
        if (pendingSubmitData.current) {
            setIsSecurityLogout(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            setActiveScreen('tasks');
            setAppearance('navy', 'blrrpix', 'default');
            await doSave(pendingSubmitData.current);
            await logout();
        }
    };

    const handleTerminateConfirm = async () => {
        try {
            setIsTerminating(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            setActiveScreen('tasks');
            setAppearance('navy', 'blrrpix', 'default');
            await deleteUser();
        } catch {
            setIsTerminating(false);
            setIsTerminateVisible(false);
            showError('Failed to terminate account. Please try again.');
        }
    };

    const ic = activeIconColor ?? colors.accentBlue;
    const icMuted = activeIconColor ?? colors.textMuted;

    return (
        <View style={styles.container}>
            <Animated.View style={{ flex: 1, transform: [{ translateY }], opacity }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <View style={styles.avatarSection}>
                        {isEditing ? (
                            <Pressable onPress={pickExistingPhoto}>
                                <View style={{ position: 'relative' }}>
                                    <Image source={getProfileImageSource(profilePictureUri)} style={styles.avatar} />
                                    <View style={styles.avatarBomb}>
                                        <Ionicons name="camera" size={16} color={colors.bgDeep} />
                                    </View>
                                </View>
                            </Pressable>
                        ) : (
                            <View style={styles.avatarWrapper}>
                                <Image source={getProfileImageSource(profilePictureUri)} style={styles.avatar} />
                            </View>
                        )}
                        <View style={styles.photoActionRow}>
                            {isEditing ? (
                                <Pressable style={styles.photoActionButton} onPress={() => setIsCameraOpen(true)}>
                                    <Ionicons name="camera-outline" size={16} color={ic} />
                                    <PlayerText style={styles.photoActionText}>Take a Picture</PlayerText>
                                </Pressable>
                            ) : (
                                <PlayerText style={styles.photoActionText}>Display Picture</PlayerText>
                            )}
                        </View>
                    </View>
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
                            showRedBorder={showNameRequirements && !isFullNameValid}
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
                        <View style={[styles.fieldBlock, { zIndex: 1 }]}>
                            <PlayerText style={[styles.fieldLabel, !isEditing && { color: colors.textDisabled }]}>Password</PlayerText>
                            <Pressable
                                style={[styles.passwordButton, !isEditing && styles.passwordButtonDisabled]}
                                onPress={() => { if (isEditing) setIsPasswordModalOpen(true); }}
                            >
                                <Ionicons name="lock-closed-outline" size={20} color={isEditing ? ic : colors.textDisabled} style={{ marginRight: 10 }} />
                                <PlayerText style={[styles.passwordButtonText, !isEditing && styles.passwordButtonTextDisabled]}>
                                    {isEditing ? 'Change Password...' : '••••••••'}
                                </PlayerText>
                                {isEditing && <Ionicons name="chevron-forward" size={16} color={icMuted} style={{ marginLeft: 'auto' }} />}
                            </Pressable>
                        </View>
                    </View>
                    <View style={[styles.actionBar, { zIndex: 150 }]}>
                        {successText ? <PlayerText style={styles.successText}>{successText}</PlayerText> : null}
                        {errorText ? <PlayerText style={styles.errorText}>{errorText}</PlayerText> : null}
                        {!isEditing ? (
                            <>
                                <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
                                    <Ionicons name="pencil-outline" size={18} color={ic} />
                                    <PlayerText style={styles.editButtonText}>Edit Profile</PlayerText>
                                </Pressable>
                                <Pressable style={styles.terminateButton} onPress={() => setIsTerminateVisible(true)}>
                                    <Ionicons name="skull-outline" size={18} color={colors.accentRed} />
                                    <PlayerText style={styles.terminateButtonText}>TERMINATE ACCOUNT</PlayerText>
                                </Pressable>
                            </>
                        ) : (
                            <View style={styles.editingButtons}>
                                <Pressable style={styles.cancelButton} onPress={handleCancelEdit}>
                                    <PlayerText style={styles.cancelButtonText}>Cancel</PlayerText>
                                </Pressable>
                                <Pressable style={[styles.saveButton, isLoading && styles.saveButtonLoading]} onPress={handleSubmit(onSubmit)} disabled={isLoading}>
                                    <PlayerText style={styles.saveButtonText}>{isLoading ? loadingText : 'Save Changes'}</PlayerText>
                                </Pressable>
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
                yesLabel="Understood"
                noLabel="Cancel"
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
                yesLabel="Terminate"
                noLabel="Cancel"
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