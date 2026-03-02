import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';

export const CIRCLE_SIZE = 44;
export const CIRCLE_HALF = CIRCLE_SIZE / 2;
export const CIRCLE_BORDER = 4;

export function makeHeaderMessageStyles(colors: ThemeColors) {
    return StyleSheet.create({
        container: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
        message: { fontSize: 15, color: colors.textMuted, textAlign: 'right', flexShrink: 1 },
        circleWrapper: {
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
        },
        circleBackground: {
            position: 'absolute',
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_HALF,
            borderWidth: CIRCLE_BORDER,
            borderColor: colors.borderSub
        },
        quadrant: { position: 'absolute', width: CIRCLE_HALF, height: CIRCLE_HALF, overflow: 'hidden' },
        quadrantNE: { top: 0, left: CIRCLE_HALF },
        quadrantSE: { top: CIRCLE_HALF, left: CIRCLE_HALF },
        quadrantSW: { top: CIRCLE_HALF, left: 0 },
        quadrantNW: { top: 0, left: 0 },
        quadrantInner: {
            position: 'absolute',
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_HALF,
            borderWidth: CIRCLE_BORDER,
            backgroundColor: 'transparent'
        },
        quadrantInnerNE: { top: 0, left: -CIRCLE_HALF },
        quadrantInnerSE: { top: -CIRCLE_HALF, left: -CIRCLE_HALF },
        quadrantInnerSW: { top: -CIRCLE_HALF, left: 0 },
        quadrantInnerNW: { top: 0, left: 0 },
        percentText: { fontSize: 11, color: colors.textPrimary }
    });
}