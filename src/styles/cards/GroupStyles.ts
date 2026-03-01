import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeGroupStyles(colors: ThemeColors) {
    return StyleSheet.create({
        group: {
            backgroundColor: colors.bgPanel,
            borderRadius: R.lg,
            borderWidth: 1,
            borderColor: colors.borderSub,
            marginBottom: 14,
            paddingTop: 10,
            paddingHorizontal: 10,
            paddingBottom: 4
        },
        groupLabelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
        groupLabel: { fontSize: 20, color: colors.textMuted, marginLeft: 2 }
    });
}