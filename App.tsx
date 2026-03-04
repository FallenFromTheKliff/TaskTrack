import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { HistoryProvider } from '@/contexts/HistoryContext';
import { TaskProvider } from '@/contexts/TaskContext';
import { ScreenProvider } from '@/contexts/ScreenContext';
import { Task } from '@/contexts/TaskContext';

import SplashScreen from '@/screens/interlude/SplashScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import LayoutScreen from '@/screens/main/generic/LayoutScreen';
import TaskFormScreen from '@/screens/main/generic/TaskFormScreen';

export type RootStackParamList = {
    Home: undefined;
    'Task Details': { task?: Task };
    Login: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function CompassNeedle() {
    const { loading, isAuthenticated } = useAuth();
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMinTimeElapsed(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading || !minTimeElapsed) return <SplashScreen isAuthenticated={isAuthenticated} />;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="Home" component={LayoutScreen} />
                        <Stack.Screen name="Task Details" component={TaskFormScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function AppProviders() {
    const { loadUserSettings, clearUserSettings } = useTheme();

    return (
        <AuthProvider onUserLoaded={loadUserSettings} onUserCleared={clearUserSettings}>
            <HistoryProvider>
                <TaskProvider>
                    <ScreenProvider>
                        <CompassNeedle />
                    </ScreenProvider>
                </TaskProvider>
            </HistoryProvider>
        </AuthProvider>
    );
}

export default function App() {
    const [playerJoined] = useFonts({
        'Blrrpix': require('./assets/fonts/blrrpixs016.ttf'),
        'CaveatBrush': require('./assets/fonts/caveatbrush.ttf'),
        'Geo': require('./assets/fonts/geo.ttf'),
        'Macondo': require('./assets/fonts/macondo.ttf'),
    });

    if (!playerJoined) return null;
    return (
        <ThemeProvider>
            <AppProviders />
        </ThemeProvider>
    );
}