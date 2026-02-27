import { StyleSheet } from 'react-native';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    wrapper: { flex: 1, zIndex: 200, position: 'relative' },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: C.bgInput,
        borderRadius: R.md,
        paddingHorizontal: 10,
        paddingVertical: 14,
        borderWidth: 2,
        borderColor: C.borderStrong
    },
    buttonDisabled: { backgroundColor: C.bgInputDark, borderColor: C.borderSub },
    value: { fontSize: 14, color: C.textPrimary, flexShrink: 1 },
    valueDisabled: { color: C.textDisabled },
    placeholder: { color: C.textMuted },
    list: {
        position: 'absolute',
        top: '100%', left: 0, right: 0,
        backgroundColor: C.bgPanel,
        borderRadius: R.md,
        borderWidth: 2,
        borderColor: C.borderSub,
        marginTop: 4,
        height: 120,
        zIndex: 9999,
        elevation: 9999
    },
    listScroll: { maxHeight: 120 },
    item: { paddingVertical: 10, paddingHorizontal: 12 },
    itemActive: { backgroundColor: C.bgDivider },
    itemText: { fontSize: 14, color: C.accentBlue },
    itemTextActive: { color: C.textPrimary }
});

export default styles;