import { StyleSheet } from 'react-native';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    searchFilterContainer: { marginBottom: 15, zIndex: 100 },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.bgPanel,
        borderRadius: R.md,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: C.borderStrong,
        marginTop: 10,
        height: 50
    },
    searchInput: { flex: 1, fontSize: 18, color: C.accentBlue },
    filterButton: { padding: 8, marginLeft: 4 },
    filterPanel: {
        backgroundColor: C.bgPanel,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderSub,
        marginTop: 18,
        zIndex: 200
    },
    filterPanelAbsolute: { position: 'absolute', top: 50, left: 0, right: 0 },
    filterPanelInner: { padding: 10, gap: 10 },
    filterSection: { gap: 6 },
    filterLabel: { fontSize: 16, color: C.accentBlue },
    filterOptions: { flexDirection: 'row', gap: 8 },
    filterOptionButton: {
        flex: 1,
        backgroundColor: C.bgDivider,
        paddingVertical: 9,
        paddingHorizontal: 8,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderMid,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterOptionButtonActive: { borderColor: C.accentBlue },
    filterOptionText: { fontSize: 14, color: C.textMuted },
    filterOptionTextActive: { color: C.accentBlue },
    dateRangeRow: { flexDirection: 'row', gap: 8 },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.bgDivider,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderMid,
        gap: 6
    },
    datePickerButtonDim: { backgroundColor: C.bgInputDark, borderColor: C.borderSub },
    datePickerText: { fontSize: 13, color: C.accentBlue, flex: 1 }
});

export default styles;