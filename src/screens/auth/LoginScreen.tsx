import { useState } from 'react';
import { View, Pressable, Animated, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import { AuthText } from '@/components/fields/PlayerText';
import { useAuth } from '@/contexts/AuthContext';
import { THEMES } from '@/contexts/ThemeContext';
import { validateEmailLogin, validatePasswordWithEmail } from '@/utils/auth/validationUtils';
import { useAuthEntrance } from '@/hooks/auth/useAuthEntrance';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useTimedMessage } from '@/hooks/auth/useTimedMessage';
import { makeAuthStyles } from '@/styles/auth/AuthStyles';

import InputField from '@/components/fields/InputField';
import LoadingScreen from '@/screens/interlude/LoadingScreen';

const NAVY = THEMES.navy;

type LoginFormData = { email: string; password: string; };
type LoginFormProps = { navigation: NativeStackNavigationProp<any>; };

export default function LoginScreen({ navigation }: LoginFormProps) {
    const { login, commitLogin } = useAuth();
    const [isLoading, setIsLoading]             = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showLoader, setShowLoader]           = useState(false);

    const { fadeIn, takeFlight } = useAuthEntrance();
    const loadingText = useLoadingText('SIGNING IN', isLoading);
    const { message: errorText, showMessage: showError } = useTimedMessage();

    const buttonLabel = isLoading ? loadingText : (errorText || 'SIGN IN');
    const navDisabled = isLoading || showLoader;

    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<LoginFormData>({
        defaultValues: { email: '', password: '' },
        mode: 'onChange',
    });
    const emailValue = watch('email');

    const onSubmit = async (data: LoginFormData) => {
        if (isLoading) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 0));
        try {
            const user = await login(data.email, data.password);
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (user) {
                reset();
                setIsLoading(false);
                setShowLoader(true);
            } else {
                setIsLoading(false);
                showError('INVALID CREDENTIALS!');
            }
        } catch {
            setIsLoading(false);
            showError('INVALID CREDENTIALS!');
        }
    };

    const handleLoaderDone = () => commitLogin();
    if (showLoader) return <LoadingScreen onDone={handleLoaderDone} />;

    const styles = makeAuthStyles(NAVY);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                scrollEnabled={!navDisabled}
            >
                <Animated.View style={[styles.header, { marginBottom: 100, opacity: fadeIn, transform: [{ translateY: takeFlight }] }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="folder-open-sharp" size={56} color={NAVY.textPrimary} />
                        <AuthText style={{ fontSize: 52, marginLeft: 8 }}>TaskTrack</AuthText>
                    </View>
                    <View>
                        <AuthText style={{ fontSize: 14, color: NAVY.textMuted }}>
                            a strangely useful app for tracking tasks!
                        </AuthText>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.form, { opacity: fadeIn }]}>
                    <InputField
                        control={control}
                        name="email"
                        label="Email"
                        placeholder="e.g., canopy2@example.com"
                        icon="mail-outline"
                        validation={validateEmailLogin}
                        errors={errors}
                        keyboardType="email-address"
                        editable={!navDisabled}
                    />
                    <InputField
                        control={control}
                        name="password"
                        label="Password"
                        placeholder="Enter your valid password"
                        icon="lock-closed-outline"
                        validation={(value) => validatePasswordWithEmail(emailValue, value)}
                        errors={errors}
                        editable={!navDisabled}
                        toggleVisibility={{ isVisible: isPasswordVisible, setIsVisible: setIsPasswordVisible }}
                    />
                    <Pressable
                        style={[styles.button, isLoading && { backgroundColor: NAVY.textMuted }]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={navDisabled}
                    >
                        <AuthText style={styles.buttonText}>{buttonLabel}</AuthText>
                    </Pressable>
                    <View style={styles.footer}>
                        <AuthText style={{ fontSize: 18, color: NAVY.textPrimary }}>Don't have an account?</AuthText>
                        <Pressable onPress={() => !navDisabled && navigation.navigate('Register')} disabled={navDisabled}>
                            <AuthText style={[styles.link, navDisabled && { color: NAVY.textDisabled }]}>Create one!</AuthText>
                        </Pressable>
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}