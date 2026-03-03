import { Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';
import { useThemeTransitionAnim } from '@/hooks/animations/useThemeTransitionAnim';
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
    const { ic } = useThemeTransitionAnim();
    const s = makeHeaderStyles(colors);
    return (
        <Animated.View style={[s.header, { backgroundColor: ic.bgPanel, borderBottomColor: ic.borderSub }]}>
            <Pressable onPress={onMenuPress} style={{ padding: 4 }}>
                <Ionicons name="menu" size={32} color={activeIconColor ?? colors.textPrimary} />
            </Pressable>
            <HeaderMessage activeScreen={activeScreen} selectedDate={selectedDate} />
        </Animated.View>
    );
}