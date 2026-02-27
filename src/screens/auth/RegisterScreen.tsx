import { useState } from 'react';
import { View, Pressable, ScrollView, Animated, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAuth } from '@/contexts/AuthContext';
import { PlayerText } from '@/components/fields/PlayerText';
import { validateUsername, validateFullName, validateEmailRegister, validatePassword, validatePasswordConfirmation, validatePhoneNumber } from '@/utils/auth/validationUtils';
import { capitalizeFullName } from '@/utils/auth/revisionUtils';
import { useAuthEntrance } from '@/hooks/auth/useAuthEntrance';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useTimedMessage } from '@/hooks/auth/useTimedMessage';
import { usePanelAnim } from '@/hooks/animations/usePanelAnim';
import { getProfileImageSource, pickImageFromLibrary } from "@/utils/auth/imageUtils";

import InputField from '@/components/fields/InputField';
import NameRequirements from '@/components/requirements/NameRequirements';
import PasswordRequirements from '@/components/requirements/PasswordRequirements';
import styles from '@/styles/auth/AuthStyles';

type RegisterFormData = {
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
};
type RegisterData = {
    profilePicture: string | null;
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
};
type RegisterFormProps = {
    navigation: NativeStackNavigationProp<any>;
};

export default function RegisterScreen({ navigation }: RegisterFormProps) {
    const { register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [profilePictureUri, setProfilePictureUri] = useState<string | null>(null);

    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [fullNameValue, setFullNameValue] = useState('');
    const [isFullNameValid, setIsFullNameValid] = useState(false);
    const [isFullNameFocused, setIsFullNameFocused] = useState(false);

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

    const { control, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
        defaultValues: { userName: '', fullName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' },
        mode: "onChange"
    });
    const password = watch('password');

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

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                scrollEnabled={!navDisabled}
            >
                <Animated.View style={[styles.header, { marginBottom: 40, opacity: fadeIn, transform: [{ translateY: takeFlight }] }]}>
                    <PlayerText style={{ fontSize: 42 }}>Join the community!</PlayerText>
                </Animated.View>
                <Animated.View style={[styles.form, { opacity: fadeIn }]}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Pressable onPress={pickImage} disabled={navDisabled}>
                            <View style={{ position: 'relative' }}>
                                <Image source={getProfileImageSource(profilePictureUri)} style={styles.pictureFrame} />
                                <View style={styles.pictureBomb}>
                                    <Ionicons name="camera" size={16} color="#313B46" />
                                </View>
                            </View>
                        </Pressable>
                        <PlayerText style={{ fontSize: 12, color: '#6D8196', marginTop: 8 }}>
                            Tap to upload a profile picture!
                        </PlayerText>
                    </View>
                    <InputField
                        control={control}
                        name="userName"
                        label="Username"
                        placeholder="e.g., _kLIFF23"
                        icon="person-outline"
                        validation={validateUsername}
                        errors={errors}
                        editable={!navDisabled}
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
                        onFocusChange={setIsFullNameFocused}
                        showRedBorder={fullNameValue.length > 0 && !isFullNameValid}
                        editable={!navDisabled}
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
                    />
                    <Pressable
                        style={[styles.button, isLoading && { backgroundColor: '#6D8196' }]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={navDisabled}
                    >
                        <PlayerText style={styles.buttonText}>{buttonLabel}</PlayerText>
                    </Pressable>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <PlayerText style={{ fontSize: 12, color: '#6D8196' }}>
                            Note: You can edit your profile details later!
                        </PlayerText>
                    </View>
                    <View style={styles.footer}>
                        <PlayerText style={{ fontSize: 18 }}>Already have an account?</PlayerText>
                        <Pressable onPress={() => !navDisabled && navigation.replace('Login')} disabled={navDisabled}>
                            <PlayerText style={[styles.link, navDisabled && { color: '#4E5D6D' }]}>Sign in!</PlayerText>
                        </Pressable>
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}