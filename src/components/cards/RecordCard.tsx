import { useState } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/forms/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { HistoryEvent } from '@/contexts/HistoryContext';
import { getHistoryDateFields } from '@/utils/shared/dateUtils';
import { useExpandCard } from '@/hooks/cards/useExpandCard';
import { capitalize } from '@/utils/auth/revisionUtils';
import { STATUS_COLORS, STATUS_ICONS } from '@/utils/shared/constantUtils';
import { makeRecordCardStyles } from '@/styles/cards/RecordCardStyles';

import PlayerButton from '@/components/fields/forms/PlayerButton';
import ConfirmModal from '@/components/modals/ConfirmModal';
import TaskDetailsModal from '@/components/modals/TaskDetailsModal';

type RecordCardProps = {
    event: HistoryEvent;
    statusOverride?: string;
    selectionMode?: boolean;
    onRestore?: (id: string) => void;
    onDelete?: (id: string) => void;
};

export default function RecordCard({ event, statusOverride, selectionMode = false, onRestore, onDelete }: RecordCardProps) {
    const { colors, activeIconColor } = useTheme();
    const { bodyHeight, setBodyHeight, handleToggleExpand, chevronRotation, bodyHeightAnim, bodyOpacityAnim } = useExpandCard();
    const [detailVisible, setDetailVisible] = useState(false);
    const [restoreVisible, setRestoreVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);

    const statusColor = STATUS_COLORS[event.status];
    const statusIcon = STATUS_ICONS[event.status];
    const statusLabel = statusOverride ?? capitalize(event.status);

    const isTrashCard = !!(onRestore || onDelete);
    const dateFields = getHistoryDateFields(event.status, event.createdAt, event.updatedAt);
    const s = makeRecordCardStyles(colors, activeIconColor);
    const ic = activeIconColor ?? colors.textMuted;

    return (
        <View style={[s.card, { borderColor: statusColor }]}>
            <Pressable style={s.cardHeader} onPress={() => { if (!selectionMode) handleToggleExpand(); }}>
                <View style={[s.statusIcon, { backgroundColor: statusColor + '22', borderColor: statusColor + '66' }]}>
                    <Ionicons name={statusIcon as any} size={18} color={statusColor} />
                </View>
                <View style={s.cardInfo}>
                    <PlayerText style={s.cardTitle} numberOfLines={1}>{event.title}</PlayerText>
                    <View style={s.cardMeta}>
                        <PlayerText style={[s.statusText, { color: statusColor }]}>Status: {statusLabel}</PlayerText>
                    </View>
                </View>
                {!selectionMode && (
                    <Animated.View style={[s.chevron, { transform: [{ rotate: chevronRotation }] }]}>
                        <Ionicons name="chevron-down" size={20} color={ic} />
                    </Animated.View>
                )}
            </Pressable>
            {!selectionMode && (
                <Animated.View style={{
                    maxHeight: bodyHeightAnim.interpolate({ inputRange: [0, 1], outputRange: [0, bodyHeight || 200] }),
                    opacity: bodyOpacityAnim,
                    overflow: 'hidden'
                }}>
                    <View onLayout={e => { const h = e.nativeEvent.layout.height; if (h > 0) setBodyHeight(h); }}>
                        <View style={s.divider} />
                        <View style={s.cardBody}>
                            {!isTrashCard && (
                                <>
                                    <View style={s.detailRowGroup}>
                                        {dateFields.map((field, i) => (
                                            <View key={i} style={[s.detailBox, s.flex]}>
                                                <PlayerText style={s.detailLabel}>{field.label}</PlayerText>
                                                <PlayerText style={s.detailValue}>{field.value}</PlayerText>
                                            </View>
                                        ))}
                                    </View>
                                    <View style={s.cardActions}>
                                        <PlayerButton
                                            variant="action"
                                            label="DETAILS"
                                            onPress={() => setDetailVisible(true)}
                                            icon="expand-outline"
                                            flex={1}
                                        />
                                    </View>
                                </>
                            )}
                            {isTrashCard && (
                                <>
                                    <View style={s.cardActions}>
                                        <PlayerButton variant="action" label="DETAILS" onPress={() => setDetailVisible(true)} icon="expand-outline" flex={1} />
                                    </View>
                                    <View style={s.trashActions}>
                                        {onRestore && (
                                            <PlayerButton variant="restore" label="DETAILS" onPress={() => setRestoreVisible(true)} icon="arrow-undo-outline" flex={1} />
                                        )}
                                        {onDelete && (
                                            <PlayerButton
                                                variant="danger"
                                                label="DELETE"
                                                onPress={() => setDeleteVisible(true)}
                                                icon="trash-outline"
                                                flex={1}
                                                style={{ paddingVertical: 10, borderWidth: 1 }}
                                            />
                                        )}
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </Animated.View>
            )}
            <TaskDetailsModal
                isVisible={detailVisible}
                event={event}
                statusOverride={statusOverride}
                onClose={() => setDetailVisible(false)}
            />
            {onRestore && (
                <ConfirmModal
                    isVisible={restoreVisible}
                    title="Restore Task?"
                    message={`"${event.title}" will be restored to your Tasks.`}
                    yesLabel="RESTORE"
                    noLabel="CANCEL"
                    yesIcon="arrow-undo-outline"
                    yesRestore
                    onNo={() => setRestoreVisible(false)}
                    onYes={() => { setRestoreVisible(false); onRestore(event.id); }}
                />
            )}
            {onDelete && (
                <ConfirmModal
                    isVisible={deleteVisible}
                    title="Delete Permanently?"
                    message={`"${event.title}" will be permanently deleted. This cannot be undone.`}
                    yesLabel="DELETE"
                    noLabel="CANCEL"
                    yesIcon="trash-outline"
                    yesDestructive
                    onNo={() => setDeleteVisible(false)}
                    onYes={() => { setDeleteVisible(false); onDelete(event.id); }}
                />
            )}
        </View>
    );
}