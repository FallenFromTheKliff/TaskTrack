import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { MAX_WIDTH } from '@/styles/shared/tokens';

export function makeFormStyles(colors: ThemeColors) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bgDeep,
            maxWidth: MAX_WIDTH,
            alignSelf: 'center',
            width: '100%'
        },
        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 30,
            paddingBottom: 15,
            backgroundColor: colors.bgPanel,
            borderBottomWidth: 2,
            borderBottomColor: colors.borderSub,
            gap: 12
        },
        backButton: { padding: 4 },
        screenTitle: { fontSize: 22, color: colors.textPrimary },
        scrollArea: { flex: 1 },
        footer: {
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: colors.bgDeep,
            borderTopWidth: 2,
            borderTopColor: colors.borderSub
        }
    });
}