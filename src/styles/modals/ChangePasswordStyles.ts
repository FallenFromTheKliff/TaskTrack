import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeModalBaseStyles } from '@/styles/shared/common';

export function makeChangePasswordStyles(colors: ThemeColors) {
    const modal = makeModalBaseStyles(colors);
    return StyleSheet.create({
        overlay: modal.overlay,
        blur: modal.blur,
        container: { ...modal.panel, width: '90%', maxWidth: 420, maxHeight: '85%', padding: 24 },
        title: { fontSize: 26, color: colors.textPrimary, marginBottom: 16 },
        body: { gap: 0 },
        actions: { flexDirection: 'row', gap: 12, marginTop: 16 }
    });
}