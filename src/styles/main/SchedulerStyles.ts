import { StyleSheet } from 'react-native';
import { panelHeader, modalPanel, fieldLabel as sharedFieldLabel } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30 },
    fieldBlock: { marginBottom: 16 },
    fieldLabel: sharedFieldLabel,
    fieldLabelRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 6, marginLeft: 4 },
    fieldLabelOptional: { fontSize: 13, color: C.textDisabled },
    inputBox: { backgroundColor: C.bgPanel, borderRadius: R.md, borderWidth: 2, borderColor: C.borderSub, paddingHorizontal: 14 },
    textAreaBox: { paddingVertical: 4 },
    textArea: { minHeight: 100, textAlignVertical: 'top', paddingVertical: 12 },
    iconPickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.bgPanel,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderSub,
        paddingHorizontal: 14,
        paddingVertical: 12,
        gap: 12
    },
    iconPreview: { width: 38, height: 38, borderRadius: R.md, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    iconPickerText: { flex: 1, fontSize: 16, color: C.textMuted },
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
        backgroundColor: C.bgPanel,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderSub,
        paddingHorizontal: 14,
        paddingVertical: 14,
        gap: 10
    },
    dateButtonEmpty: { borderColor: C.bgInputDark },
    dateButtonText: { fontSize: 18, color: C.accentBlue },
    dateButtonPlaceholder: { color: C.textDisabled },
    durationRow: { flexDirection: 'row', gap: 8 },
    durationButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderSub,
        backgroundColor: C.bgPanel,
        gap: 6
    },
    durationButtonActive: { borderColor: C.borderStrong, backgroundColor: C.bgInputDark },
    durationLabel: { fontSize: 16, color: C.textDisabled },
    durationLabelActive: { color: C.accentBlue },
    iconModalBackdrop: {
        flex: 1,
        backgroundColor: C.overlay92,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    iconModalPanel: { ...modalPanel, width: '100%', maxWidth: 420, maxHeight: 480, overflow: 'hidden' },
    iconModalHeader: panelHeader,
    iconModalTitle: { fontSize: 20, color: C.textPrimary },
    iconGrid: { padding: 12, gap: 8 }
});

export default styles;