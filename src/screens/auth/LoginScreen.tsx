import { useState } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { useForm } from 'react-hook-form';
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from '@/contexts/AuthContext';
import { validateEmailLogin, validatePassword } from '@/utils/auth/validationUtils';
import { useAuthEntrance } from '@/hooks/auth/useAuthEntrance';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useTimedMessage } from '@/hooks/auth/useTimedMessage';

import InputField from '@/components/fields/InputField';
import LoadingScreen from '@/screens/interlude/LoadingScreen';
import styles from '@/styles/auth/AuthStyles';

type LoginFormData = {
    email: string;
    password: string;
};
type LoginFormProps = {
    navigation: NativeStackNavigationProp<any>;
};

export default function LoginScreen({ navigation }: LoginFormProps) {
    const { login, commitLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const { fadeIn, takeFlight } = useAuthEntrance();
    const loadingText = useLoadingText('SIGNING IN', isLoading);
    const { message: errorText, showMessage: showError } = useTimedMessage();

    const buttonLabel = isLoading ? loadingText : (errorText || 'SIGN IN');
    const navDisabled = isLoading || showLoader;

    const { control, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>({
        defaultValues: { email: '', password: '' },
        mode: "onChange"
    });

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

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { marginBottom: 100, opacity: fadeIn, transform: [{ translateY: takeFlight }] }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="folder-open-sharp" size={56} color='#BFCDDC' />
                    <PlayerText style={{ fontSize: 52, marginLeft: 8 }}>TaskTrack</PlayerText>
                </View>
                <View>
                    <PlayerText style={{ fontSize: 14, color: '#6D8196' }}>
                        a strangely useful app for tracking tasks!
                    </PlayerText>
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
                    validation={validatePassword}
                    errors={errors}
                    editable={!navDisabled}
                    toggleVisibility={{ isVisible: isPasswordVisible, setIsVisible: setIsPasswordVisible }}
                />

                <Pressable
                    style={[styles.button, isLoading && { backgroundColor: '#6D8196' }]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={navDisabled}
                >
                    <PlayerText style={styles.buttonText}>{buttonLabel}</PlayerText>
                </Pressable>

                <View style={styles.footer}>
                    <PlayerText style={{ fontSize: 18 }}>Don't have an account?</PlayerText>
                    <Pressable onPress={() => !navDisabled && navigation.navigate('Register')} disabled={navDisabled}>
                        <PlayerText style={[styles.link, navDisabled && { color: '#4E5D6D' }]}>Create one!</PlayerText>
                    </Pressable>
                </View>
            </Animated.View>
        </View>
    );
}