import { ReactNode } from 'react';
import { View, Pressable, Image, StyleSheet, StyleProp, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme, ThemeColors } from '@/contexts/ThemeContext';
import { getProfileImageSource } from '@/utils/auth/imageUtils';
import { makeCameraBadge } from '@/styles/shared/common';

function makeProfileAvatarStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        avatarSection: { alignItems: 'center', marginBottom: 20 },
        avatar: { width: 100, height: 100, borderRadius: 20, borderWidth: 3, borderColor: colors.borderMid },
        avatarBomb: makeCameraBadge(colors, activeIconColor) as any,
        bottomRow: { flexDirection: 'row', gap: 8, marginTop: 10 }
    });
}

type ProfileAvatarProps = {
    profilePictureUri: string | null;
    onPickPhoto: () => void;
    disabled?: boolean;
    avatarStyle?: StyleProp<ImageStyle>;
    badgeIconColor?: string;
    renderBottom?: () => ReactNode;
};

export default function ProfileAvatar({ profilePictureUri, onPickPhoto, disabled = false, avatarStyle, badgeIconColor, renderBottom }: ProfileAvatarProps) {
    const { colors, activeIconColor } = useTheme();
    const s = makeProfileAvatarStyles(colors, activeIconColor);
    return (
        <View style={s.avatarSection}>
            <Pressable onPress={onPickPhoto} disabled={disabled}>
                <View style={{ position: 'relative' }}>
                    <Image source={getProfileImageSource(profilePictureUri)} style={[s.avatar, avatarStyle]} />
                    {!disabled && (
                        <View style={s.avatarBomb}>
                            <Ionicons name="camera" size={16} color={badgeIconColor ?? colors.bgDeep} />
                        </View>
                    )}
                </View>
            </Pressable>
            {renderBottom && (
                <View style={s.bottomRow}>
                    {renderBottom()}
                </View>
            )}
        </View>
    );
}