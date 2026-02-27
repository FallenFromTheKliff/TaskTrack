import { StyleSheet } from 'react-native';
import { screenContainer } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    container: screenContainer,
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 15,
        backgroundColor: C.bgPanel,
        borderBottomWidth: 2,
        borderBottomColor: C.borderSub,
        gap: 12
    },
    backButton: { padding: 4 },
    screenTitle: { fontSize: 22, color: C.textPrimary },
    scrollArea: { flex: 1 },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: C.bgDeep,
        borderTopWidth: 2,
        borderTopColor: C.borderSub
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: C.greenBg,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.greenBorder,
        paddingVertical: 15,
        gap: 8
    },
    submitButtonUpdate: { backgroundColor: '#1A2535', borderColor: '#2E4A6E' },
    submitButtonDisabled: { backgroundColor: '#1A1F25', borderColor: C.bgInputDark },
    submitText: { fontSize: 22, color: C.accentGreen },
    submitTextUpdate: { color: '#7BAFD4' },
    submitTextDisabled: { color: C.textDisabled }
});

export default styles;