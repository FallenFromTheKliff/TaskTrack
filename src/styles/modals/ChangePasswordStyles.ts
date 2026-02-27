import { StyleSheet } from 'react-native';
import { modalOverlay, modalBlur, modalPanel, cancelButton, cancelText, primaryButton, primaryButtonText } from '@/styles/shared/common';
import { C } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    modalOverlay: modalOverlay,
    modalBlur: modalBlur,
    container: {
        ...modalPanel,
        width: '90%',
        maxWidth: 420,
        maxHeight: '85%',
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
    },
    closeButton: { padding: 4 },
    errorText: { fontSize: 13, color: C.errorRed, marginTop: 6, marginLeft: 5 },
    actions: { flexDirection: 'row', gap: 12, marginTop: 16 },
    cancelButton: cancelButton,
    cancelText: cancelText,
    confirmButton: primaryButton,
    confirmButtonDisabled: { backgroundColor: C.bgPanel, borderColor: C.borderSub },
    confirmText: primaryButtonText,
    confirmTextDisabled: { color: C.textDisabled }
});

export default styles;