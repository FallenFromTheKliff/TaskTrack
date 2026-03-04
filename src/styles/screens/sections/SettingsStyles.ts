import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';

export function makeSettingsStyles(colors: ThemeColors) {
    return StyleSheet.create({
        scroll: { flex: 1 },
        scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40, gap: 4 },
        sectionTitle: { fontSize: 13, color: colors.textDisabled, marginTop: 16, marginBottom: 6, marginLeft: 2 },
        dropdownLabel: { fontSize: 16, marginBottom: 6, marginLeft: 2 },
        block: {
            backgroundColor: colors.bgPanel,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.borderSub,
            padding: 14,
            marginBottom: 10,
            gap: 8
        },
        blockDivider: { height: 2, backgroundColor: colors.borderSub, marginVertical: 4 },
        blockLabel: { fontSize: 18, color: colors.textPrimary },
        blockHint: { fontSize: 13, color: colors.textMuted },
        dirtyBanner: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: colors.bgDivider,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.accentGold,
            paddingVertical: 10,
            paddingHorizontal: 12,
            marginBottom: 10
        },
        dirtyBannerText: { fontSize: 13, flex: 1 },
        appearanceActions: { flexDirection: 'row', gap: 10, marginBottom: 10 },
        toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
        toggleInfo: { flex: 1, gap: 4 },
        toggleButton: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 4 },
        toggleLabel: { fontSize: 14, color: colors.textDisabled },
        placeholderBar: { flexDirection: 'row', alignItems: 'center', gap: 10, opacity: 0.4 },
        placeholderTrack: {
            flex: 1,
            height: 6,
            backgroundColor: colors.borderMid,
            borderRadius: 3,
            overflow: 'hidden'
        },
        placeholderFill: { height: '100%', backgroundColor: colors.textDisabled, borderRadius: 3 },
        comingSoon: { fontSize: 12, color: colors.textDisabled, fontStyle: 'italic' }
    });
}