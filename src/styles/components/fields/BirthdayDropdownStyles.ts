import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeBirthdayDropdownStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        wrapper: { flex: 1, position: 'relative' },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.bgInput,
            borderRadius: R.md,
            paddingHorizontal: 10,
            paddingVertical: 14,
            borderWidth: 2,
            borderColor: colors.borderStrong
        },
        buttonDisabled: { backgroundColor: colors.bgInputDark, borderColor: colors.borderSub },
        value: { fontSize: 14, color: colors.textPrimary, flexShrink: 1 },
        valueDisabled: { color: colors.textDisabled },
        placeholder: { color: colors.textMuted },
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
            maxHeight: 120,
            zIndex: 9999,
            elevation: 9999
        },
        listScroll: { maxHeight: 120 },
        item: { paddingVertical: 10, paddingHorizontal: 12 },
        itemActive: { backgroundColor: colors.bgDivider },
        itemText: { fontSize: 14, color: activeIconColor ?? colors.accentBlue },
        itemTextActive: { color: colors.textPrimary }
    });
}