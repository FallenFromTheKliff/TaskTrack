import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeSectionStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        content: { flex: 1, paddingHorizontal: 20 },
        taskListScrollView: { flex: 1 },
        taskListContent: { flexGrow: 1, paddingVertical: 14 },
        fab: {
            width: 72,
            height: 72,
            borderRadius: 18,
            backgroundColor: activeIconColor ?? colors.accentBlue,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 8
        },
        fabContainer: { position: 'absolute', bottom: 14, right: 20, zIndex: 200, alignItems: 'flex-end' },
        fabAction: { position: 'absolute', bottom: 0, right: 0, alignItems: 'flex-end' },
        fabActionButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: 4,
            backgroundColor: colors.bgPanel,
            borderRadius: R.xl,
            borderWidth: 2,
            borderColor: colors.borderSub,
            paddingVertical: 12,
            paddingHorizontal: 14,
            gap: 8,
            minWidth: 180
        },
        fabActionTextCreate: { fontSize: 16, color: colors.accentGreen },
        fabActionTextRemove: { fontSize: 16, color: colors.accentRed }
    });
}