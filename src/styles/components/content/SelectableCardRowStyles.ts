import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeSelectableCardRowStyles(colors: ThemeColors, isSelected: boolean) {
    return StyleSheet.create({
        row: { flexDirection: 'row', alignItems: 'center' },
        checkboxArea: { width: 32, alignItems: 'center', justifyContent: 'center' },
        checkbox: {
            width: 22,
            height: 22,
            borderRadius: R.sm,
            borderWidth: 2,
            borderColor: isSelected ? colors.accentRed : colors.borderStrong,
            backgroundColor: isSelected ? colors.accentRed : colors.bgPanel,
            alignItems: 'center',
            justifyContent: 'center'
        },
        content: { flex: 1 }
    });
}