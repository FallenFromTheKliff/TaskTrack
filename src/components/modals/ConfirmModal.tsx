import { View, Pressable, Animated, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useOverlayAnim } from '@/hooks/animations/useOverlayAnim';
import { useLoadingText } from '@/hooks/main/useLoadingText';

import styles from '@/styles/modals/ConfirmStyles';

type ConfirmModalProps = {
    isVisible: boolean;
    title: string;
    message: string;
    yesLabel?: string;
    noLabel?: string;
    yesIcon?: keyof typeof Ionicons.glyphMap;
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
    yesLabel = 'Yes',
    noLabel = 'No',
    yesIcon,
    yesDestructive = false,
    yesPositive = false,
    isLoading = false,
    loadingLabel = 'Loading',
    loadingTitle,
    onNo,
    onYes
}: ConfirmModalProps) {
    const { opacity: fadeAnim, scale: scaleAnim } = useOverlayAnim(isVisible);
    const loadingText = useLoadingText(loadingLabel, isLoading);
    const displayTitle = isLoading && loadingTitle ? loadingTitle : title;
    const yesButtonStyle = [
        styles.yesButton,
        yesDestructive && styles.yesDestructiveButton,
        yesPositive && styles.yesPositiveButton
    ];
    const yesIconColor = yesDestructive ? '#FFCCCB' : yesPositive ? '#C8F0D0' : '#161C24';
    const yesTextStyle = [
        styles.yesText,
        yesDestructive && styles.yesDestructiveText,
        yesPositive && styles.yesPositiveText
    ];
    return (
        <Modal visible={isVisible} transparent animationType="none">
            <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                <View style={styles.modalBlur} />
                <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
                    <PlayerText style={styles.title}>{displayTitle}</PlayerText>
                    <PlayerText style={styles.message}>
                        {isLoading ? loadingText : message}
                    </PlayerText>
                    {!isLoading && (
                        <View style={styles.actions}>
                            <Pressable style={styles.noButton} onPress={onNo}>
                                <PlayerText style={styles.noText}>{noLabel}</PlayerText>
                            </Pressable>
                            <Pressable style={yesButtonStyle} onPress={onYes}>
                                {yesIcon && (
                                    <Ionicons name={yesIcon} size={18} color={yesIconColor} />
                                )}
                                <PlayerText style={yesTextStyle}>{yesLabel}</PlayerText>
                            </Pressable>
                        </View>
                    )}
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}