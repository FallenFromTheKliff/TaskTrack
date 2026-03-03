import { useRef, useEffect } from 'react';
import { View, Pressable, Animated, Modal, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useScreen, ScreenKey } from '@/contexts/ScreenContext';
import { useTheme, FONT_FAMILIES } from '@/contexts/ThemeContext';
import { getProfileImageSource } from '@/utils/auth/imageUtils';
import { makeSidebarStyles, SIDEBAR_WIDTH } from '@/styles/components/layout/SidebarStyles';

type SidebarUser = {
    profilePicture: string | null;
    userName: string;
    email: string;
};
type SidebarProps = {
    isVisible: boolean;
    user: SidebarUser;
    onClose: () => void;
    onLogoutPress: () => void;
};

const NAV_ITEMS: { key: ScreenKey; label: string; icon: string }[] = [
    { key: 'tasks', label: 'Tasks', icon: 'checkmark-done-outline' },
    { key: 'history', label: 'History', icon: 'time-outline' },
    { key: 'trash', label: 'Trash Bin', icon: 'trash-outline' },
    { key: 'settings', label: 'Settings', icon: 'settings-outline' }
];

export default function Sidebar({ isVisible, user, onClose, onLogoutPress }: SidebarProps) {
    const { activeScreen, setActiveScreen } = useScreen();
    const { colors, settings, activeIconColor, activeFont } = useTheme();
    const s = makeSidebarStyles(colors, activeIconColor);

    const backdropAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

    useEffect(() => {
        if (isVisible) {
            if (settings.useAnimations) {
                backdropAnim.setValue(0);
                slideAnim.setValue(-SIDEBAR_WIDTH);
                Animated.parallel([
                    Animated.timing(backdropAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
                    Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 50, useNativeDriver: true })
                ]).start();
            } else {
                backdropAnim.setValue(1);
                slideAnim.setValue(0);
            }
        }
    }, [isVisible, settings.useAnimations]);

    const handleNavPress = (key: ScreenKey) => { setActiveScreen(key); onClose(); };
    const handleProfilePress = () => { setActiveScreen('profile'); onClose(); };
    const isProfileActive = activeScreen === 'profile';
    const activeColor = activeIconColor ?? colors.accentBlue;
    const ic = activeIconColor ?? colors.accentBlue;

    return (
        <Modal visible={isVisible} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
            <View style={s.modalOuter}>
                <View style={s.modalInner}>
                    <Animated.View style={[s.backdrop, { opacity: backdropAnim }]}>
                        <Pressable style={{ flex: 1 }} onPress={onClose} />
                    </Animated.View>
                    <Animated.View style={[s.sidebar, { transform: [{ translateX: slideAnim }] }]}>
                        <View style={s.logoRow}>
                            <Ionicons name="folder-open-sharp" size={40} color={activeColor} />
                            <PlayerText style={s.logoText}>TaskTrack</PlayerText>
                        </View>
                        <Pressable
                            style={[
                                s.profileCard,
                                isProfileActive && [
                                    s.profileCardActive,
                                    { borderColor: activeColor }
                                ]
                            ]}
                            onPress={handleProfilePress}
                        >
                            <Image source={getProfileImageSource(user.profilePicture)} style={s.profilePicture} />
                            <View style={s.profileInfo}>
                                <Text style={[s.profileUsername, { fontFamily: FONT_FAMILIES[activeFont] }]}>
                                    {user.userName}
                                </Text>
                                <PlayerText style={s.profileEmail} numberOfLines={1}>{user.email}</PlayerText>
                                <View style={s.profileEditHint}>
                                    <Ionicons name="pencil-outline" size={11} color={ic} />
                                    <PlayerText style={s.profileEditHintText}>Change Profile Details</PlayerText>
                                </View>
                            </View>
                        </Pressable>
                        {NAV_ITEMS.map(item => {
                            const isActive = activeScreen === item.key;
                            return (
                                <Pressable
                                    key={item.key}
                                    style={[s.navItem, isActive && s.navItemActive]}
                                    onPress={() => handleNavPress(item.key)}
                                >
                                    <Ionicons
                                        name={item.icon as any}
                                        size={22}
                                        color={isActive
                                            ? (activeIconColor ?? colors.textPrimary)
                                            : (activeIconColor ?? colors.textMuted)}
                                    />
                                    <PlayerText style={[s.navText, isActive && s.navTextActive]}>
                                        {item.label}
                                    </PlayerText>
                                </Pressable>
                            );
                        })}
                        <View style={s.bottomSection}>
                            <Pressable style={s.logoutItem} onPress={onLogoutPress}>
                                <Ionicons name="log-out-outline" size={22} color={colors.accentRed} />
                                <PlayerText style={s.logoutText}>Logout</PlayerText>
                            </Pressable>
                        </View>
                    </Animated.View>
                </View>
            </View>
        </Modal>
    );
}