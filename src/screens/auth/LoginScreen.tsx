import { useState, useRef } from 'react';
import { View, Animated, ScrollView } from 'react-native';
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
import PlayerButton from '@/components/fields/PlayerButton';

import InputField from '@/components/fields/InputField';
import LoadingScreen from '@/screens/interlude/LoadingScreen';

const NAVY = THEMES.navy;

type LoginFormData = { email: string; password: string; };
type LoginFormProps = { navigation: NativeStackNavigationProp<any>; };

export default function LoginScreen({ navigation }: LoginFormProps) {
    const { login, commitLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const contentOpacity = useRef(new Animated.Value(1)).current;

    const { fadeIn, takeFlight } = useAuthEntrance();
    const loadingText = useLoadingText('SIGNING IN', isLoading);
    const { message: errorText, showMessage: showError } = useTimedMessage();

    const buttonLabel = isLoading ? loadingText : (errorText || 'SIGN IN');
    const navDisabled = isLoading || showLoader;

    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<LoginFormData>({
        defaultValues: { email: '', password: '' },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });
    const emailValue = watch('email');

    const onSubmit = async (data: LoginFormData) => {
        if (isLoading) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 0));
        try {
            const user = await login(data.email, data.password);
            if (user) {
                reset();
                await new Promise(resolve => setTimeout(resolve, 800));
                await new Promise<void>(resolve =>
                    Animated.timing(contentOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => resolve())
                );
                setIsLoading(false);
                setShowLoader(true);
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
            <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
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
                            colorsOverride={NAVY}
                            iconColorOverride={NAVY.accentBlue}
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
                            colorsOverride={NAVY}
                            iconColorOverride={NAVY.accentBlue}
                        />
                        <PlayerButton
                            variant="auth"
                            label={buttonLabel}
                            onPress={handleSubmit(onSubmit)}
                            disabled={navDisabled}
                        />
                        <View style={styles.footer}>
                            <AuthText style={{ fontSize: 18, color: NAVY.textPrimary }}>Don't have an account? </AuthText>
                            <PlayerButton
                                variant="link"
                                label="Create one!"
                                onPress={() => navigation.navigate('Register')}
                                disabled={navDisabled}
                            />
                        </View>
                    </Animated.View>
                </ScrollView>
            </Animated.View>
        </View>
    );
}