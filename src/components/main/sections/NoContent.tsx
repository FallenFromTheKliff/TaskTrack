import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlayerText } from '@/components/fields/PlayerText';
import { C } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        gap: 12,
        minHeight: 200
    },
    title: { fontSize: 22, marginTop: 8 },
    subtitle: { fontSize: 16, color: C.textDisabled, textAlign: 'center', paddingHorizontal: 20 }
});

type NoContentProps = {
    icon: string;
    title: string;
    subtitle: string;
    iconColor?: string;
    titleColor?: string;
};

export default function NoContent({ icon, title, subtitle, iconColor = C.textDisabled, titleColor = C.textMuted }: NoContentProps) {
    return (
        <View style={styles.container}>
            <Ionicons name={icon as any} size={52} color={iconColor} />
            <PlayerText style={[styles.title, { color: titleColor }]}>{title}</PlayerText>
            <PlayerText style={styles.subtitle}>{subtitle}</PlayerText>
        </View>
    );
}