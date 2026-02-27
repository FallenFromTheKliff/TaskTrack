import { StyleSheet } from 'react-native';
import { modalBlur, modalPanel, panelHeader, panelFooter, cancelButton, cardStyles } from '@/styles/shared/common';
import { C, R, MAX_WIDTH } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    blur: modalBlur,
    wrapper: {
        width: '100%',
        maxWidth: MAX_WIDTH,
        paddingHorizontal: 16
    },
    panel: {
        ...modalPanel,
        maxHeight: '92%',
        overflow: 'hidden'
    },
    panelHeader: {
        ...panelHeader,
        gap: 12
    },
    statusIcon: {
        width: 36,
        height: 36,
        borderRadius: R.md,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    panelTitle: { flex: 1, fontSize: 18, color: C.textPrimary },
    scrollContent: { padding: 16, gap: 12 },
    detailRow: cardStyles.detailBox,
    detailRowGroup: { flexDirection: 'row', gap: 8 },
    flex: { flex: 1 },
    detailLabel: cardStyles.detailLabel,
    detailValue: cardStyles.detailValue,
    descriptionValue: { minHeight: 60 },
    notesValue: { fontStyle: 'italic' },
    detailValueDue: { color: C.accentGold },
    detailValueEmpty: { fontStyle: 'italic', color: C.textDisabled },
    deletionValue: { color: C.accentRed },
    panelFooter: panelFooter,
    closeButton: {
        ...cancelButton,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 6
    },
    closeButtonText: { fontSize: 16, color: C.accentBlue },
    trashButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: '#A04545',
        backgroundColor: C.accentRedBg
    },
    trashButtonText: { fontSize: 16, color: '#FFCCCB' }
});

export default styles;