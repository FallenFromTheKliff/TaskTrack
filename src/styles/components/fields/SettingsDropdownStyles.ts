import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeSettingsDropdownStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        wrapper: { position: 'relative', marginBottom: 12 },
        fieldLabel: { fontSize: 14, color: activeIconColor ?? colors.accentBlue, marginBottom: 6, marginLeft: 2 },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.fieldBg,
            borderRadius: R.md,
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderWidth: 2,
            borderColor: colors.fieldBorder
        },
        valueText: { fontSize: 16, color: colors.textPrimary },
        list: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: colors.bgPanel,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.borderSub,
            marginTop: 4,
            maxHeight: 160,
            zIndex: 9999,
            elevation: 9999
        },
        listScroll: { maxHeight: 160 },
        item: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 14
        },
        itemText: { fontSize: 15 }
    });
}