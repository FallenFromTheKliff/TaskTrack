import { Animated } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from '@expo/vector-icons';
import { useEntranceAnim } from '@/hooks/animations/useEntranceAnim';

import styles from '@/styles/main/SectionStyles';

export default function SettingsSection() {
    const { translateY, opacity } = useEntranceAnim();
    return (
        <Animated.View style={[styles.content, styles.centeredContent, { transform: [{ translateY }], opacity }]}>
            <Ionicons name="settings-outline" size={52} color="#4E5D6D" />
            <PlayerText style={styles.emptyText}>Settings</PlayerText>
            <PlayerText style={styles.emptySubtext}>Coming soon...</PlayerText>
        </Animated.View>
    );
}