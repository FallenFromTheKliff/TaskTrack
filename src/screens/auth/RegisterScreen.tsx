import { useState } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useForm } from 'react-hook-form';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAuth } from '@/contexts/AuthContext';
import { AuthText } from '@/components/fields/forms/PlayerText';
import { THEMES } from '@/contexts/ThemeContext';
import { validateUsername, validateFullName, validateEmailRegister, validatePassword, validatePasswordConfirmation, validatePhoneNumber } from '@/utils/auth/validationUtils';
import { capitalizeFullName } from '@/utils/auth/revisionUtils';
import { useAuthEntrance } from '@/hooks/auth/useAuthEntrance';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useTimedMessage } from '@/hooks/auth/useTimedMessage';
import { usePanelAnim } from '@/hooks/animations/usePanelAnim';
import { pickImageFromLibrary } from '@/utils/auth/imageUtils';
import { makeAuthStyles } from '@/styles/auth/AuthStyles';

import InputField from '@/components/fields/forms/InputField';
import PlayerButton from '@/components/fields/forms/PlayerButton';
import ProfileAvatar from '@/components/fields/common/ProfileAvatar';
import NameRequirements from '@/components/requirements/NameRequirements';
import PasswordRequirements from '@/components/requirements/PasswordRequirements';

const NAVY = THEMES.navy;

type RegisterFormData = {
    userName: string; fullName: string; email: string;
    phoneNumber: string; password: string; confirmPassword: string;
};
type RegisterData = {
    profilePicture: string | null; userName: string; fullName: string;
    email: string; phoneNumber: string; password: string;
};
type RegisterFormProps = { navigation: NativeStackNavigationProp<any>; };

export default function RegisterScreen({ navigation }: RegisterFormProps) {
    const { register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [profilePictureUri, setProfilePictureUri] = useState<string | null>(null);

    const [fullNameValue, setFullNameValue] = useState('');
    const [isFullNameValid, setIsFullNameValid] = useState(false);
    const [isFullNameFocused, setIsFullNameFocused] = useState(false);

    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const { fadeIn, takeFlight } = useAuthEntrance();
    const loadingText = useLoadingText('CREATING ACCOUNT', isLoading);
    const { message: errorText, showMessage: showError } = useTimedMessage();

    const buttonLabel = isLoading ? loadingText : (errorText || 'CREATE ACCOUNT');
    const navDisabled = isLoading;

    const { height: nameRequirementsHeight, opacity: nameRequirementsLight } = usePanelAnim({
        targetHeight: 180,
        visible: fullNameValue.length > 0 && (isFullNameFocused || !isFullNameValid),
    });
    const { height: passRequirementsHeight, opacity: passRequirementsLight } = usePanelAnim({
        targetHeight: 210,
        visible: passwordValue.length > 0 && (isPasswordFocused || !isPasswordValid),
    });

    const pickImage = async () => {
        const uri = await pickImageFromLibrary();
        if (uri) setProfilePictureUri(uri);
    };

    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterFormData>({
        defaultValues: { userName: '', fullName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });
    const password = watch('password');

    const handleFullNameFocusChange = (isFocused: boolean) => {
        setIsFullNameFocused(isFocused);
        if (!isFocused && fullNameValue.length > 0) {
            const formatted = capitalizeFullName(fullNameValue);
            setFullNameValue(formatted);
            setValue('fullName', formatted);
        }
    };

    const onSubmit = async (data: RegisterFormData) => {
        if (isLoading) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 0));
        try {
            const registerData: RegisterData = {
                profilePicture: profilePictureUri,
                userName: data.userName,
                fullName: capitalizeFullName(data.fullName),
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password
            };
            await Promise.all([
                register(registerData),
                new Promise(resolve => setTimeout(resolve, 2000))
            ]);
            navigation.replace('Login');
        } catch {
            setIsLoading(false);
            showError('REGISTRATION FAILED!');
        } finally {
            setIsLoading(false);
        }
    };

    const styles = makeAuthStyles(NAVY);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                scrollEnabled={!navDisabled}
            >
                <Animated.View style={[styles.header, { marginBottom: 40, opacity: fadeIn, transform: [{ translateY: takeFlight }] }]}>
                    <AuthText style={{ fontSize: 42, color: NAVY.textPrimary }}>Join the community!</AuthText>
                </Animated.View>
                <Animated.View style={[styles.form, { opacity: fadeIn }]}>
                    <ProfileAvatar
                        profilePictureUri={profilePictureUri}
                        onPickPhoto={pickImage}
                        disabled={navDisabled}
                        avatarStyle={styles.pictureFrame}
                        badgeIconColor="#313B46"
                        renderBottom={() => (
                            <AuthText style={{ fontSize: 12, color: NAVY.textMuted }}>
                                Tap to upload a profile picture!
                            </AuthText>
                        )}
                    />
                    <InputField
                        control={control}
                        name="userName"
                        label="Username"
                        placeholder="e.g., _kLIFF23"
                        icon="person-outline"
                        validation={validateUsername}
                        errors={errors}
                        editable={!navDisabled}
                        colorsOverride={NAVY}
                        iconColorOverride={NAVY.accentBlue}
                    />
                    <InputField
                        control={control}
                        name="fullName"
                        label="Full Name"
                        placeholder="e.g., Tony Stark"
                        icon="person-circle-outline"
                        validation={validateFullName}
                        errors={errors}
                        onChangeValue={setFullNameValue}
                        onFocusChange={handleFullNameFocusChange}
                        showRedBorder={fullNameValue.length > 0 && !isFullNameValid}
                        editable={!navDisabled}
                        colorsOverride={NAVY}
                        iconColorOverride={NAVY.accentBlue}
                    />
                    <Animated.View style={{ overflow: 'hidden', height: nameRequirementsHeight, opacity: nameRequirementsLight }}>
                        <NameRequirements fullName={fullNameValue} onValidationChange={setIsFullNameValid} />
                    </Animated.View>
                    <InputField
                        control={control}
                        name="email"
                        label="Email Address"
                        placeholder="e.g., canopy2@example.com"
                        icon="mail-outline"
                        validation={validateEmailRegister}
                        errors={errors}
                        keyboardType="email-address"
                        editable={!navDisabled}
                        colorsOverride={NAVY}
                        iconColorOverride={NAVY.accentBlue}
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
                        editable={!navDisabled}
                        colorsOverride={NAVY}
                        iconColorOverride={NAVY.accentBlue}
                    />
                    <InputField
                        control={control}
                        name="password"
                        label="Password"
                        placeholder="Enter a valid password"
                        icon="lock-closed-outline"
                        validation={validatePassword}
                        errors={errors}
                        onChangeValue={setPasswordValue}
                        onFocusChange={setIsPasswordFocused}
                        showRedBorder={passwordValue.length > 0 && !isPasswordValid}
                        editable={!navDisabled}
                        toggleVisibility={{ isVisible: isPasswordVisible, setIsVisible: setIsPasswordVisible }}
                        colorsOverride={NAVY}
                        iconColorOverride={NAVY.accentBlue}
                    />
                    <Animated.View style={{ overflow: 'hidden', height: passRequirementsHeight, opacity: passRequirementsLight }}>
                        <PasswordRequirements password={passwordValue} onValidationChange={setIsPasswordValid} />
                    </Animated.View>
                    <InputField
                        control={control}
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="(Re-enter your password)"
                        icon="lock-closed-outline"
                        validation={(value) => validatePasswordConfirmation(password, value)}
                        errors={errors}
                        editable={!navDisabled}
                        toggleVisibility={{ isVisible: isConfirmPasswordVisible, setIsVisible: setIsConfirmPasswordVisible }}
                        colorsOverride={NAVY}
                        iconColorOverride={NAVY.accentBlue}
                    />
                    <PlayerButton
                        variant="auth"
                        label={buttonLabel}
                        onPress={handleSubmit(onSubmit)}
                        disabled={navDisabled}
                    />
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <AuthText style={{ fontSize: 12, color: NAVY.textMuted }}>
                            Note: You can edit your profile details later!
                        </AuthText>
                    </View>
                    <View style={styles.footer}>
                        <AuthText style={{ fontSize: 18, color: NAVY.textPrimary }}>Already have an account? </AuthText>
                        <PlayerButton
                            variant="link"
                            label="Sign in!"
                            onPress={() => navigation.replace('Login')}
                            disabled={navDisabled}
                        />
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}