import { StyleSheet } from 'react-native';
import { C } from '@/styles/shared/tokens';

export const SIZE = 44;
export const HALF = SIZE / 2;
export const BORDER = 4;

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
    message: { fontSize: 15, color: C.textMuted, textAlign: 'right', flexShrink: 1 },
    circleWrapper: { width: SIZE, height: SIZE, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
    circleBackground: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: HALF,
        borderWidth: BORDER,
        borderColor: C.borderSub
    },
    quadrant: { position: 'absolute', width: HALF, height: HALF, overflow: 'hidden' },
    quadrantNE: { top: 0, left: HALF },
    quadrantSE: { top: HALF, left: HALF },
    quadrantSW: { top: HALF, left: 0 },
    quadrantNW: { top: 0, left: 0 },
    quadrantInner: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: HALF,
        borderWidth: BORDER,
        borderColor: C.accentBlue,
        backgroundColor: 'transparent'
    },
    quadrantInnerNE: { top: 0, left: -HALF },
    quadrantInnerSE: { top: -HALF, left: -HALF },
    quadrantInnerSW: { top: -HALF, left: 0 },
    quadrantInnerNW: { top: 0, left: 0 },
    percentText: { fontSize: 11, color: C.textPrimary },
    percentTextDone: { color: C.accentGreen },
    ringDone: { borderColor: C.accentGreen },
});

export default styles;