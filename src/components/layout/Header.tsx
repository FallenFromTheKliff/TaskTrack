import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';
import { ScreenKey } from '@/contexts/ScreenContext';
import { makeHeaderStyles } from '@/styles/components/layout/HeaderStyles';
import HeaderMessage from '@/components/layout/HeaderMessage';

type HeaderProps = {
    onMenuPress: () => void;
    activeScreen: ScreenKey;
    selectedDate: string;
};

export default function Header({ onMenuPress, activeScreen, selectedDate }: HeaderProps) {
    const { colors, activeIconColor } = useTheme();
    const s = makeHeaderStyles(colors);
    return (
        <View style={s.header}>
            <Pressable onPress={onMenuPress} style={{ padding: 4 }}>
                <Ionicons name="menu" size={32} color={activeIconColor ?? colors.textPrimary} />
            </Pressable>
            <HeaderMessage activeScreen={activeScreen} selectedDate={selectedDate} />
        </View>
    );
}