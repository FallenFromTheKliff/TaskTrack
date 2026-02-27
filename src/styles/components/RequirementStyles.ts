import { StyleSheet } from 'react-native';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    container: {
        backgroundColor: C.bgInputDark,
        borderRadius: R.md,
        padding: 15,
        borderWidth: 2
    },
    header: { fontSize: 16, color: C.textMuted, marginBottom: 12, fontWeight: '600' },
    requirement: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    requirementText: { fontSize: 14, color: C.textDisabled, marginLeft: 8 }
});

export default styles;