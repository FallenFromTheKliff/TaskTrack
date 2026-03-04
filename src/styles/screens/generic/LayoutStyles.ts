import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeScreenContainer } from '@/styles/shared/common';

export function makeLayoutStyles(colors: ThemeColors) {
    return StyleSheet.create({
        container: makeScreenContainer(colors),
        screenArea: { flex: 1 },
        noteBar: {
            backgroundColor: colors.bgPanel,
            borderTopWidth: 1,
            borderTopColor: colors.borderSub,
            paddingHorizontal: 20,
            paddingVertical: 10
        },
        noteText: { fontSize: 14, color: colors.textDisabled }
    });
}