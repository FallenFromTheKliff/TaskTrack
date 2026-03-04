import { View, Modal, Pressable, Animated } from 'react-native';

import { PlayerText } from '@/components/fields/forms/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useOverlayAnim } from '@/hooks/animations/useOverlayAnim';
import { makeConfirmStyles } from '@/styles/components/modals/ConfirmStyles';

import PlayerButton from '@/components/fields/forms/PlayerButton';

type ConfirmModalProps = {
    isVisible: boolean;
    title: string;
    message: string;
    yesLabel: string;
    noLabel: string;
    yesIcon?: string;
    yesDestructive?: boolean;
    yesPositive?: boolean;
    yesRestore?: boolean;
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
    yesRestore = false,
    isLoading = false,
    loadingLabel,
    loadingTitle,
    onNo,
    onYes
}: ConfirmModalProps) {
    const { colors } = useTheme();
    const { opacity, scale } = useOverlayAnim(isVisible, 'scale');

    const s = makeConfirmStyles(colors, yesDestructive, yesPositive, yesRestore);
    const yesIconColor = yesDestructive ? colors.accentRed : yesRestore ? colors.accentGold : yesPositive ? colors.accentGreen : colors.accentBlue;

    const displayTitle = isLoading && loadingTitle ? loadingTitle : title;
    const loadingText = useLoadingText(loadingLabel ?? 'LOADING', isLoading);

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
                                <PlayerButton variant="ghost" label={noLabel} onPress={onNo} flex={1} />
                                <PlayerButton
                                    variant={yesDestructive ? 'danger' : yesRestore ? 'restore' : 'primary'}
                                    label={yesLabel}
                                    onPress={onYes}
                                    icon={yesIcon as any}
                                    iconColor={yesIconColor}
                                    flex={1}
                                />
                            </View>
                        </>
                    )}
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}