import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { R } from '@/styles/shared/tokens';

export function makeSearchFilterStyles(colors: ThemeColors, activeIconColor?: string | null) {
    return StyleSheet.create({
        searchFilterContainer: { marginBottom: 15, zIndex: 100 },
        searchBarContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgPanel,
            borderRadius: R.md,
            paddingHorizontal: 15,
            borderWidth: 2,
            borderColor: colors.borderStrong,
            marginTop: 10,
            height: 50
        },
        searchInput: { flex: 1, fontSize: 18, color: activeIconColor ?? colors.accentBlue },
        filterButton: { padding: 8, marginLeft: 4 },
        filterPanel: {
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            backgroundColor: colors.bgPanel,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.borderSub,
            marginTop: 18,
            zIndex: 200,
            overflow: 'hidden'
        },
        filterPanelAbsolute: {
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            zIndex: 200
        },
        filterPanelInner: { padding: 10, gap: 10 },
        filterSection: { gap: 6 },
        filterLabel: { fontSize: 16, color: activeIconColor ?? colors.accentBlue },
        filterOptions: { flexDirection: 'row', gap: 8 },
        filterOptionButton: {
            flex: 1,
            backgroundColor: colors.bgDivider,
            paddingVertical: 9,
            paddingHorizontal: 8,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.borderMid,
            alignItems: 'center',
            justifyContent: 'center'
        },
        filterOptionButtonActive: { borderColor: activeIconColor ?? colors.accentBlue },
        filterOptionText: { fontSize: 14, color: colors.textMuted },
        filterOptionTextActive: { color: activeIconColor ?? colors.accentBlue },
        dateRangeRow: { flexDirection: 'row', gap: 8 },
        datePickerButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgDivider,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: R.md,
            borderWidth: 2,
            borderColor: colors.borderMid,
            gap: 6
        },
        datePickerButtonDim: { backgroundColor: colors.bgInputDark, borderColor: colors.borderSub },
        datePickerText: { fontSize: 13, color: activeIconColor ?? colors.accentBlue, flex: 1 }
    });
}