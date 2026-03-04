import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeFieldLabel } from '@/styles/shared/common';
import { R } from '@/styles/shared/tokens';

export function makeSchedulerStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        scrollView: { flex: 1 },
        scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30 },
        fieldBlock: { marginBottom: 16 },
        fieldLabel: makeFieldLabel(colors, activeIconColor),
        iconPickerButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgPanel,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.borderSub,
            paddingHorizontal: 14,
            paddingVertical: 12,
            gap: 12
        },
        iconPreview: {
            width: 38,
            height: 38,
            borderRadius: R.md,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        iconPickerText: { flex: 1, fontSize: 16, color: colors.textMuted },
        priorityRow: { flexDirection: 'row', gap: 8 },
        priorityButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            borderRadius: R.md,
            borderWidth: 2,
            gap: 6
        },
        priorityLabel: { fontSize: 16 },
        dateButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgPanel,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.borderSub,
            paddingHorizontal: 14,
            paddingVertical: 14,
            gap: 10
        },
        dateButtonEmpty: { borderColor: colors.bgInputDark },
        dateButtonText: { fontSize: 18, color: activeIconColor ?? colors.accentBlue },
        dateButtonPlaceholder: { color: colors.textDisabled },
        durationRow: { flexDirection: 'row', gap: 8 },
        durationButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.borderSub,
            backgroundColor: colors.bgPanel,
            gap: 6
        },
        durationButtonActive: { borderColor: colors.borderStrong, backgroundColor: colors.bgInputDark },
        durationLabel: { fontSize: 16, color: colors.textDisabled },
        durationLabelActive: { color: activeIconColor ?? colors.accentBlue }
    });
}