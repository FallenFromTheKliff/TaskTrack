import { StyleSheet } from 'react-native';

import { modalPanel, panelHeader } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: C.overlay92,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    panel: { ...modalPanel, width: '100%', maxWidth: 420, overflow: 'hidden' },
    header: { ...panelHeader, justifyContent: 'center' },
    title: { fontSize: 28, color: C.textPrimary },
    grid: { padding: 10 },
    cell: {
        flex: 1,
        aspectRatio: 0.85,
        margin: 4,
        borderRadius: R.md,
        borderWidth: 1,
        borderColor: C.borderSub,
        backgroundColor: C.bgDeep,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 6
    },
    cellLabel: { fontSize: 9, color: C.textDisabled, textAlign: 'center' }
});

export default styles;