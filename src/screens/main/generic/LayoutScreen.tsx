import { useState, useEffect } from 'react';
import { Animated, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '@/contexts/AuthContext';
import { useScreen } from '@/contexts/ScreenContext';
import { AnimatedPlayerText } from '@/components/fields/forms/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeTransitionAnim } from '@/hooks/animations/useThemeTransitionAnim';
import { getTodayString } from '@/utils/shared/dateUtils';
import { makeLayoutStyles } from '@/styles/screens/generic/LayoutStyles';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ConfirmModal from '@/components/modals/ConfirmModal';
import TaskSection from '@/screens/main/sections/TaskSection';
import ProfileSection from '@/screens/main/sections/ProfileSection';
import HistorySection from '@/screens/main/sections/HistorySection';
import TrashSection from '@/screens/main/sections/TrashSection';
import SettingsSection from '@/screens/main/sections/SettingsSection';

type LayoutScreenProps = {
    navigation: NativeStackNavigationProp<any>;
};

const SCREEN_TITLES: Record<string, string> = {
    profile: 'Profile', tasks: 'Tasks', history: 'History', trash: 'Trash', settings: 'Settings',
};
const SECTION_NOTES: Record<string, string> = {
    profile: 'Note: Some changes may take a while to update after consecutive edits.',
    tasks: 'Note: Tasks not completed by their scheduled date are automatically moved to the Trash.',
    history: 'Note: This is a complete record of all task activity.',
    trash: 'Note: You have 30 days before tasks here are permanently deleted.',
    settings: 'Note: Some configurations may take some time to take effect.',
};

export default function LayoutScreen({ navigation }: LayoutScreenProps) {
    const { user, logout } = useAuth();
    const { activeScreen, setActiveScreen } = useScreen();
    const { colors } = useTheme();
    const { ic } = useThemeTransitionAnim();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const s = makeLayoutStyles(colors);

    useEffect(() => {
        navigation.setOptions({ title: SCREEN_TITLES[activeScreen] });
    }, [activeScreen]);

    const handleLogoutConfirm = async () => {
        setIsLoggingOut(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setActiveScreen('tasks');
        await logout();
    };

    const noteText = SECTION_NOTES[activeScreen];
    if (!user) return null;

    return (
        <Animated.View style={[s.container, { backgroundColor: ic.bgDeep }]}>
            <Header
                onMenuPress={() => setIsSidebarOpen(true)}
                activeScreen={activeScreen}
                selectedDate={getTodayString()}
            />
            <Sidebar
                isVisible={isSidebarOpen}
                user={user}
                onClose={() => setIsSidebarOpen(false)}
                onLogoutPress={() => { setIsSidebarOpen(false); setIsLogoutVisible(true); }}
            />
            <ConfirmModal
                isVisible={isLogoutVisible}
                title="Logging out?"
                message="You'll need to sign back in to access your tasks."
                yesLabel="Logout"
                noLabel="Cancel"
                yesIcon="log-out-outline"
                yesDestructive
                isLoading={isLoggingOut}
                loadingLabel="LEAVING"
                loadingTitle="See you next time!"
                onNo={() => setIsLogoutVisible(false)}
                onYes={handleLogoutConfirm}
            />
            <View style={[s.screenArea, { position: 'relative' }]}>
                {activeScreen === 'profile' && <ProfileSection />}
                {activeScreen === 'history' && <HistorySection />}
                {activeScreen === 'trash' && <TrashSection />}
                {activeScreen === 'settings' && <SettingsSection />}
                {activeScreen === 'tasks' && <TaskSection navigation={navigation} />}
            </View>
            {noteText && (
                <Animated.View style={[s.noteBar, { backgroundColor: ic.bgPanel, borderTopColor: ic.borderSub }]}>
                    <AnimatedPlayerText style={[s.noteText, { color: ic.textDisabled }]}>{noteText}</AnimatedPlayerText>
                </Animated.View>
            )}
        </Animated.View>
    );
}