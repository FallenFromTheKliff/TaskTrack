import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';

export function makeNoContentStyles(colors: ThemeColors) {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
            gap: 12,
            minHeight: 200
        },
        title: { fontSize: 22, marginTop: 8, color: colors.textMuted },
        subtitle: { fontSize: 16, textAlign: 'center', paddingHorizontal: 20, color: colors.textDisabled }
    });
}