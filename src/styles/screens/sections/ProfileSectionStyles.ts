import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeFieldLabel } from '@/styles/shared/common';

export function makeProfileSectionStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        container: { flex: 1 },
        scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
        form: { gap: 0 },
        fieldBlock: { marginBottom: 16 },
        fieldLabel: makeFieldLabel(colors, activeIconColor),
        birthdayRow: { flexDirection: 'row', gap: 8, marginBottom: 4, zIndex: 100 },
        actionBar: { marginTop: 8, gap: 8 },
        editingButtons: { flexDirection: 'row', gap: 10 }
    });
}