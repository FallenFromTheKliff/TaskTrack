import { useState } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from '@expo/vector-icons';
import { HistoryEvent } from '@/contexts/HistoryContext';
import { getHistoryDateFields } from '@/utils/shared/dateUtils';
import { useExpandCard } from '@/hooks/cards/useExpandCard';
import { capitalize } from '@/utils/auth/revisionUtils';
import { STATUS_COLORS, STATUS_ICONS } from '@/utils/shared/constantUtils';

import ConfirmModal from '@/components/modals/ConfirmModal';
import TaskDetailsModal from '@/components/modals/TaskDetailsModal';
import styles from '@/styles/cards/RecordCardStyles';

type RecordCardProps = {
    event: HistoryEvent;
    statusOverride?: string;
    selectionMode?: boolean;
    onRestore?: (id: string) => void;
    onDelete?: (id: string) => void;
};

export default function RecordCard({ event, statusOverride, selectionMode = false, onRestore, onDelete }: RecordCardProps) {
    const { bodyHeight, setBodyHeight, handleToggleExpand, chevronRotation, bodyHeightAnim, bodyOpacityAnim } = useExpandCard();
    const [detailVisible, setDetailVisible] = useState(false);
    const [restoreVisible, setRestoreVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const statusColor = STATUS_COLORS[event.status];
    const statusIcon = STATUS_ICONS[event.status];
    const statusLabel = statusOverride ?? capitalize(event.status);
    const isTrashCard = !!(onRestore || onDelete);
    const dateFields = getHistoryDateFields(event.status, event.createdAt, event.updatedAt);
    return (
        <View style={[styles.card, { borderColor: statusColor }]}>
            <Pressable style={styles.cardHeader} onPress={() => { if (!selectionMode) handleToggleExpand(); }}>
                <View style={[styles.statusIcon, { backgroundColor: statusColor + '22', borderColor: statusColor + '66' }]}>
                    <Ionicons name={statusIcon as any} size={18} color={statusColor} />
                </View>
                <View style={styles.cardInfo}>
                    <PlayerText style={styles.cardTitle} numberOfLines={1}>{event.title}</PlayerText>
                    <View style={styles.cardMeta}>
                        <PlayerText style={[styles.statusText, { color: statusColor }]}>Status: {statusLabel}</PlayerText>
                    </View>
                </View>
                {!selectionMode && (
                    <Animated.View style={[styles.chevron, { transform: [{ rotate: chevronRotation }] }]}>
                        <Ionicons name="chevron-down" size={20} color="#6D8196" />
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
                        <View style={styles.divider} />
                        <View style={styles.cardBody}>
                            {!isTrashCard && (
                                <>
                                    <View style={styles.detailRow}>
                                        <PlayerText style={styles.detailLabel}>Description:</PlayerText>
                                        <PlayerText style={styles.detailValue}>{event.description || 'No description provided.'}</PlayerText>
                                    </View>
                                    <View style={styles.detailRowGroup}>
                                        {dateFields.map((field, i) => (
                                            <View key={i} style={[styles.detailRow, styles.flex]}>
                                                <PlayerText style={styles.detailLabel}>{field.label}</PlayerText>
                                                <PlayerText style={styles.detailValue}>{field.value}</PlayerText>
                                            </View>
                                        ))}
                                        {event.endDate && (
                                            <View key="due" style={[styles.detailRow, styles.flex]}>
                                                <PlayerText style={styles.detailLabel}>Due Until:</PlayerText>
                                                <PlayerText style={[styles.detailValue, styles.detailValueDue]}>{event.endDate}</PlayerText>
                                            </View>
                                        )}
                                    </View>
                                    <View style={styles.cardActions}>
                                        <Pressable style={styles.detailsButton} onPress={() => setDetailVisible(true)}>
                                            <Ionicons name="expand-outline" size={16} color="#8EA7C1" />
                                            <PlayerText style={styles.detailsButtonText}>Details</PlayerText>
                                        </Pressable>
                                    </View>
                                </>
                            )}
                            {isTrashCard && (
                                <>
                                    <View style={styles.cardActions}>
                                        <Pressable style={styles.detailsButton} onPress={() => setDetailVisible(true)}>
                                            <Ionicons name="expand-outline" size={16} color="#8EA7C1" />
                                            <PlayerText style={styles.detailsButtonText}>Details</PlayerText>
                                        </Pressable>
                                    </View>
                                    <View style={styles.trashActions}>
                                        {onRestore && (
                                            <Pressable style={styles.restoreButton} onPress={() => setRestoreVisible(true)}>
                                                <Ionicons name="arrow-undo-outline" size={16} color="#C47A3A" />
                                                <PlayerText style={styles.restoreButtonText}>Restore</PlayerText>
                                            </Pressable>
                                        )}
                                        {onDelete && (
                                            <Pressable style={styles.deleteButton} onPress={() => setDeleteVisible(true)}>
                                                <Ionicons name="trash-outline" size={16} color="#C47A7A" />
                                                <PlayerText style={styles.deleteButtonText}>Delete</PlayerText>
                                            </Pressable>
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
                    yesLabel="Restore"
                    noLabel="Cancel"
                    yesIcon="arrow-undo-outline"
                    yesPositive
                    onNo={() => setRestoreVisible(false)}
                    onYes={() => { setRestoreVisible(false); onRestore(event.id); }}
                />
            )}
            {onDelete && (
                <ConfirmModal
                    isVisible={deleteVisible}
                    title="Delete Permanently?"
                    message={`"${event.title}" will be permanently deleted. This cannot be undone.`}
                    yesLabel="Delete"
                    noLabel="Cancel"
                    yesIcon="trash-outline"
                    yesDestructive
                    onNo={() => setDeleteVisible(false)}
                    onYes={() => { setDeleteVisible(false); onDelete(event.id); }}
                />
            )}
        </View>
    );
}