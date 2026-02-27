import { StyleSheet } from 'react-native';
import { cardStyles } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

const actionButtonBase = {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 6,
    paddingVertical: 10,
    borderRadius: R.md,
    borderWidth: 1
};

const styles = StyleSheet.create({
    card: { ...cardStyles.base, marginBottom: 12 },
    cardHeader: cardStyles.header,
    statusIcon: cardStyles.iconBadge,
    cardInfo: cardStyles.info,
    cardTitle: cardStyles.title,
    cardMeta: cardStyles.meta,
    statusText: { fontSize: 13 },
    chevron: { padding: 4 },
    divider: cardStyles.divider,
    cardBody: { ...cardStyles.body, gap: 10 },
    detailRow: cardStyles.detailBox,
    detailRowGroup: { flexDirection: 'row', gap: 8 },
    flex: { flex: 1 },
    detailLabel: cardStyles.detailLabel,
    detailValue: cardStyles.detailValue,
    detailValueDue: { color: C.accentGold },
    cardActions: { flexDirection: 'row', gap: 8 },
    detailsButton: { ...actionButtonBase, borderColor: C.borderMid, backgroundColor: C.bgDeep },
    detailsButtonText: { fontSize: 14, color: C.accentBlue },
    trashActions: { flexDirection: 'row', gap: 8 },
    restoreButton: { ...actionButtonBase, borderColor: '#6F4A1A', backgroundColor: '#2A1E0A' },
    restoreButtonText: { fontSize: 14, color: C.accentOrange },
    deleteButton: { ...actionButtonBase, borderColor: '#6F3030', backgroundColor: '#2A1515' },
    deleteButtonText: { fontSize: 14, color: C.accentRed }
});

export default styles;