import { StyleSheet } from 'react-native';
import { screenContainer, checkboxStyles } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    container: screenContainer,
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 15,
        backgroundColor: C.bgPanel,
        borderBottomWidth: 2,
        borderBottomColor: C.borderSub
    },
    screenArea: { flex: 1 },
    content: { flex: 1, paddingHorizontal: 20 },
    centeredContent: { justifyContent: 'center', alignItems: 'center' },
    taskListScrollView: { flex: 1 },
    taskListContent: { flexGrow: 1, paddingVertical: 14 },
    emptyText: { fontSize: 22, color: C.textMuted, marginTop: 8 },
    emptySubtext: { fontSize: 16, color: C.textDisabled, textAlign: 'center', paddingHorizontal: 20 },
    noteBar: {
        backgroundColor: C.bgPanel,
        borderTopWidth: 1,
        borderTopColor: C.borderSub,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    noteText: { fontSize: 14, color: C.textDisabled },
    fab: {
        width: 72,
        height: 72,
        borderRadius: 18,
        backgroundColor: C.accentBlue,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8
    },
    fabContainer: { position: 'absolute', bottom: 14, right: 20, zIndex: 200, alignItems: 'flex-end' },
    fabAction: { position: 'absolute', bottom: 0, right: 0, alignItems: 'flex-end' },
    fabActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: C.bgPanel,
        borderRadius: R.xl,
        borderWidth: 2,
        borderColor: C.borderSub,
        paddingVertical: 12,
        paddingHorizontal: 14,
        gap: 8,
        minWidth: 180
    },
    fabActionTextCreate: { fontSize: 16, color: C.accentGreen },
    fabActionTextRemove: { fontSize: 16, color: C.accentRed },
    trashCardRow: { flexDirection: 'row', alignItems: 'center' },
    trashCheckboxArea: { width: 32, alignItems: 'center', justifyContent: 'center' },
    trashCheckbox: checkboxStyles.box,
    trashCheckboxSelected: checkboxStyles.boxSelected,
    trashCardContent: { flex: 1 },
    trashFooterRow: { flexDirection: 'row', gap: 10, paddingVertical: 10, paddingHorizontal: 20 },
    trashCancelButton: {
        flex: 1,
        backgroundColor: C.bgDivider,
        paddingVertical: 14,
        borderRadius: R.xl,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: C.borderMid
    },
    trashCancelText: { fontSize: 16, color: C.accentBlue },
    trashDeleteButton: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: C.accentRedBg,
        paddingVertical: 14,
        borderRadius: R.xl,
        borderWidth: 2,
        borderColor: '#A04545',
        gap: 8
    },
    trashDeleteButtonDisabled: { backgroundColor: C.bgPanel, borderColor: C.borderSub },
    trashDeleteText: { fontSize: 16, color: '#FFCCCB' },
    trashDeleteTextDisabled: { color: C.textDisabled }
});

export default styles;