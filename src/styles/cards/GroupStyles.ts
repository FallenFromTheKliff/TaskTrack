import { StyleSheet } from 'react-native';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    group: {
        backgroundColor: '#1A2030',
        borderRadius: R.lg,
        borderWidth: 1,
        borderColor: '#2A3344',
        marginBottom: 14,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 4
    },
    groupLabelRow: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4
    },
    groupLabel: {
        fontSize: 20,
        fontWeight: '600',
        color: C.textMuted,
        marginBottom: 8,
        marginLeft: 2
    },
});

export default styles;