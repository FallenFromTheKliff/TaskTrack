import { StyleSheet } from 'react-native';

import { modalOverlay, modalBlur, modalPanel, cancelButton, cancelText, primaryButton } from '@/styles/shared/common';
import { C } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    modalOverlay: modalOverlay,
    modalBlur: modalBlur,
    container: { ...modalPanel, width: '85%', maxWidth: 400, padding: 24, gap: 8 },
    title: { fontSize: 26, color: C.textPrimary, marginBottom: 4 },
    message: { fontSize: 16, color: C.textMuted, lineHeight: 24, marginBottom: 8 },
    actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
    noButton: cancelButton,
    noText: cancelText,
    yesButton: primaryButton,
    yesDestructiveButton: { backgroundColor: C.accentRedBg, borderColor: '#A04545' },
    yesPositiveButton: { backgroundColor: '#3A7A4A', borderColor: '#4A9E5A' },
    yesText: { fontSize: 18, color: '#C8F0D0' },
    yesDestructiveText: { color: '#FFCCCB' },
    yesPositiveText: { color: '#C8F0D0' }
});

export default styles;