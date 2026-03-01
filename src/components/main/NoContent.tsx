import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { makeNoContentStyles } from '@/styles/components/layout/NoContentStyles';

type NoContentProps = {
    icon: string;
    title: string;
    subtitle: string;
    iconColor?: string;
    titleColor?: string;
};

export default function NoContent({ icon, title, subtitle, iconColor, titleColor }: NoContentProps) {
    const { colors, activeIconColor } = useTheme();
    const s = makeNoContentStyles(colors);
    return (
        <View style={s.container}>
            <Ionicons name={icon as any} size={52} color={iconColor ?? (activeIconColor ?? colors.textDisabled)} />
            <PlayerText style={[s.title, titleColor ? { color: titleColor } : undefined]}>{title}</PlayerText>
            <PlayerText style={s.subtitle}>{subtitle}</PlayerText>
        </View>
    );
}