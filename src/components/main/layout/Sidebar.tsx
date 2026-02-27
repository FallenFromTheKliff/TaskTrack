import { useRef, useEffect } from 'react';
import { View, Pressable, Animated, Modal, Image } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from '@expo/vector-icons';
import { useScreen, ScreenKey } from '@/contexts/ScreenContext';
import { getProfileImageSource } from "@/utils/auth/imageUtils";

import styles, { SIDEBAR_WIDTH } from '@/styles/main/SidebarStyles';

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

    const backdropAnim = useRef(new Animated.Value(0)).current;
    const slideAnim    = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

    useEffect(() => {
        if (isVisible) {
            backdropAnim.setValue(0);
            slideAnim.setValue(-SIDEBAR_WIDTH);
            Animated.parallel([
                Animated.timing(backdropAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
                Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 50, useNativeDriver: true })
            ]).start();
        }
    }, [isVisible]);

    const handleNavPress = (key: ScreenKey) => {
        setActiveScreen(key);
        onClose();
    };

    const handleProfilePress = () => {
        setActiveScreen('profile');
        onClose();
    };

    const isProfileActive = activeScreen === 'profile';

    return (
        <Modal visible={isVisible} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
            <View style={styles.modalOuter}>
                <View style={styles.modalInner}>
                    <Animated.View style={[styles.backdrop, { opacity: backdropAnim }]}>
                        <Pressable style={{ flex: 1 }} onPress={onClose} />
                    </Animated.View>

                    <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
                        <View style={styles.logoRow}>
                            <Ionicons name="folder-open-sharp" size={40} color="#BFCDDC" />
                            <PlayerText style={styles.logoText}>TaskTrack</PlayerText>
                        </View>

                        <Pressable
                            style={[
                                styles.profileCard,
                                isProfileActive && styles.profileCardActive
                            ]}
                            onPress={handleProfilePress}
                        >
                            <Image source={getProfileImageSource(user.profilePicture)} style={styles.profilePicture} />
                            <View style={styles.profileInfo}>
                                <PlayerText style={styles.profileUsername} numberOfLines={1}>
                                    {user.userName}
                                </PlayerText>
                                <PlayerText style={styles.profileEmail} numberOfLines={1}>
                                    {user.email}
                                </PlayerText>
                                <View style={styles.profileEditHint}>
                                    <Ionicons name="pencil-outline" size={11} color="#8EA7C1" />
                                    <PlayerText style={styles.profileEditHintText}>Change Profile Details</PlayerText>
                                </View>
                            </View>
                        </Pressable>

                        {NAV_ITEMS.map((item) => {
                            const isActive = activeScreen === item.key;
                            return (
                                <Pressable
                                    key={item.key}
                                    style={[styles.navItem, isActive && styles.navItemActive]}
                                    onPress={() => handleNavPress(item.key)}
                                >
                                    <Ionicons
                                        name={item.icon as any}
                                        size={22}
                                        color={isActive ? '#BFCDDC' : '#6D8196'}
                                    />
                                    <PlayerText style={[styles.navText, isActive && styles.navTextActive]}>
                                        {item.label}
                                    </PlayerText>
                                </Pressable>
                            );
                        })}

                        <View style={styles.bottomSection}>
                            <Pressable style={styles.logoutItem} onPress={onLogoutPress}>
                                <Ionicons name="log-out-outline" size={22} color="#C47A7A" />
                                <PlayerText style={styles.logoutText}>Logout</PlayerText>
                            </Pressable>
                        </View>
                    </Animated.View>
                </View>
            </View>
        </Modal>
    );
}