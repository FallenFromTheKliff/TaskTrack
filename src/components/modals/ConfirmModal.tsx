import { View, Modal, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useOverlayAnim } from '@/hooks/animations/useOverlayAnim';
import { makeConfirmStyles } from '@/styles/modals/ConfirmStyles';

type ConfirmModalProps = {
    isVisible: boolean;
    title: string;
    message: string;
    yesLabel: string;
    noLabel: string;
    yesIcon?: string;
    yesDestructive?: boolean;
    yesPositive?: boolean;
    isLoading?: boolean;
    loadingLabel?: string;
    loadingTitle?: string;
    onNo: () => void;
    onYes: () => void;
};

export default function ConfirmModal({
    isVisible,
    title,
    message,
    yesLabel,
    noLabel,
    yesIcon,
    yesDestructive = false,
    yesPositive = false,
    isLoading = false,
    loadingLabel,
    loadingTitle,
    onNo,
    onYes
}: ConfirmModalProps) {
    const { colors } = useTheme();
    const loadingText = useLoadingText(loadingLabel ?? 'LOADING', isLoading);
    const { opacity, scale } = useOverlayAnim(isVisible, 'scale');
    const s = makeConfirmStyles(colors, yesDestructive, yesPositive);

    const displayTitle = isLoading && loadingTitle ? loadingTitle : title;
    const yesIconColor = yesDestructive ? '#D08888' : yesPositive ? '#70B880' : '#7AAAD8';

    return (
        <Modal visible={isVisible} transparent animationType="none" onRequestClose={isLoading ? undefined : onNo}>
            <Animated.View style={[s.modalOverlay, { opacity }]}>
                <Pressable style={s.modalBlur} onPress={isLoading ? undefined : onNo} />
                <Animated.View style={[s.container, { transform: [{ scale }] }]}>
                    <PlayerText style={s.title}>{displayTitle}</PlayerText>
                    {isLoading ? (
                        <PlayerText style={[s.message, { color: colors.textMuted }]}>{loadingText}</PlayerText>
                    ) : (
                        <>
                            <PlayerText style={s.message}>{message}</PlayerText>
                            <View style={s.actions}>
                                <Pressable style={s.noButton} onPress={onNo}>
                                    <PlayerText style={s.noText}>{noLabel}</PlayerText>
                                </Pressable>
                                <Pressable style={s.yesButton} onPress={onYes}>
                                    {yesIcon && (
                                        <Ionicons name={yesIcon as any} size={18} color={yesIconColor} />
                                    )}
                                    <PlayerText style={s.yesText}>{yesLabel}</PlayerText>
                                </Pressable>
                            </View>
                        </>
                    )}
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}