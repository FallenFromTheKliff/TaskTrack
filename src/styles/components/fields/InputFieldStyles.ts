import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeInputFieldStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        label: { fontSize: 18, marginBottom: 6, marginLeft: 4 },
        inputField: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: R.md,
            paddingHorizontal: 15,
            borderWidth: 2
        },
        inputError: { marginLeft: 5, marginTop: 5, height: 20 },
        errorText: { fontSize: 10, color: colors.errorRed },
        schedulerFieldBlock: { marginBottom: 16 },
        schedulerFieldLabelRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 6, marginLeft: 4 },
        schedulerFieldLabel: { fontSize: 18, color: activeIconColor ?? colors.accentBlue },
        schedulerFieldLabelOptional: { fontSize: 13, color: colors.textDisabled },
        schedulerInputBox: {
            borderRadius: R.md,
            borderWidth: 2,
            paddingHorizontal: 14,
            backgroundColor: colors.bgPanel,
            borderColor: colors.borderSub
        },
        schedulerTextAreaBox: { paddingVertical: 4 },
        schedulerTextArea: { minHeight: 100, textAlignVertical: 'top', paddingVertical: 12 }
    });
}