import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { MAX_WIDTH } from '@/styles/shared/tokens';

export function makeLayoutStyles(colors: ThemeColors) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bgDeep,
            maxWidth: MAX_WIDTH,
            alignSelf: 'center',
            width: '100%'
        },
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