import { StyleSheet } from 'react-native';

import type { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeRequirementStyles(colors: ThemeColors) {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.bgInputDark,
            borderRadius: R.md,
            padding: 15,
            borderWidth: 2
        },
        header: { fontSize: 16, color: colors.textMuted, marginBottom: 12 },
        requirement: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
        requirementText: { fontSize: 14, color: colors.textDisabled, marginLeft: 8 }
    });
}