import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/contexts/ThemeContext';

export function makeHeaderStyles(colors: ThemeColors) {
    return StyleSheet.create({
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 30,
            paddingBottom: 15,
            backgroundColor: colors.bgPanel,
            borderBottomWidth: 2,
            borderBottomColor: colors.borderSub
        },
        menuButton: { padding: 4 }
    });
}