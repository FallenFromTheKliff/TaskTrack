import { StyleSheet } from 'react-native';
import { cameraBadge, fieldLabel } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
    avatarSection: { alignItems: 'center', marginBottom: 20 },
    avatarWrapper: { position: 'relative' },
    avatar: { width: 100, height: 100, borderRadius: 20, borderWidth: 3, borderColor: C.borderMid },
    avatarBomb: cameraBadge,
    photoActionRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
    photoActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: C.bgPanel,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderSub,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    photoActionText: { fontSize: 13, color: C.accentBlue },
    form: { gap: 0 },
    fieldBlock: { marginBottom: 16 },
    fieldLabel: fieldLabel,
    birthdayRow: { flexDirection: 'row', gap: 8, marginBottom: 4, zIndex: 100 },
    passwordButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.bgInput,
        borderRadius: R.md,
        paddingHorizontal: 15,
        paddingVertical: 14,
        borderWidth: 2,
        borderColor: C.borderStrong,
        marginBottom: 16
    },
    passwordButtonDisabled: { backgroundColor: C.bgInputDark, borderColor: C.borderSub },
    passwordButtonText: { fontSize: 18, color: C.accentBlue },
    passwordButtonTextDisabled: { color: C.textDisabled },
    actionBar: { marginTop: 8, gap: 8 },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: C.bgPanel,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderSub,
        paddingVertical: 12,
        gap: 8
    },
    editButtonText: { fontSize: 18, color: C.accentBlue },
    terminateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2A1010',
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: '#5A2020',
        paddingVertical: 12,
        gap: 8
    },
    terminateButtonText: { fontSize: 18, color: '#FF6B6B' },
    editingButtons: { flexDirection: 'row', gap: 10 },
    cancelButton: {
        flex: 1,
        backgroundColor: C.bgDivider,
        paddingVertical: 12,
        borderRadius: R.md,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: C.borderMid
    },
    cancelButtonText: { fontSize: 18, color: C.accentBlue },
    saveButton: {
        flex: 2,
        backgroundColor: C.accentBlue,
        paddingVertical: 12,
        borderRadius: R.md,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: C.textPrimary
    },
    saveButtonLoading: { backgroundColor: C.borderStrong, borderColor: C.borderStrong },
    saveButtonText: { fontSize: 18, color: C.bgDeep },
    successText: { fontSize: 14, color: C.accentGreen, textAlign: 'center' },
    errorText: { fontSize: 14, color: C.errorRed, textAlign: 'center' }
});

export default styles;