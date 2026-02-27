import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenKey } from '@/contexts/ScreenContext';

import HeaderMessage from '@/components/main/layout/HeaderMessage';
import styles from '@/styles/main/SectionStyles';

type HeaderProps = {
    onMenuPress: () => void;
    activeScreen: ScreenKey;
    selectedDate: string;
};

export default function Header({ onMenuPress, activeScreen, selectedDate }: HeaderProps) {
    return (
        <View style={styles.header}>
            <Pressable onPress={onMenuPress} style={{ padding: 4 }}>
                <Ionicons name="menu" size={32} color="#BFCDDC" />
            </Pressable>
            <HeaderMessage activeScreen={activeScreen} selectedDate={selectedDate} />
        </View>
    );
}