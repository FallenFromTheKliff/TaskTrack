import { View, Pressable, Animated, Modal, ScrollView } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from '@expo/vector-icons';
import { HistoryEvent } from '@/contexts/HistoryContext';
import { formatTimestamp, formatDateShort } from '@/utils/shared/dateUtils';
import { capitalize } from '@/utils/auth/revisionUtils';
import { STATUS_COLORS, STATUS_ICONS, PRIORITY_LABELS, PRIORITY_COLORS } from '@/utils/shared/constantUtils';
import { useOverlayAnim } from '@/hooks/animations/useOverlayAnim';
import styles from '@/styles/modals/TaskDetailsStyles';

type DetailsModalProps = {
    isVisible: boolean;
    event: HistoryEvent;
    statusOverride?: string;
    onClose: () => void;
    onMoveToTrash?: () => void;
};

export default function TaskDetailsModal({ isVisible, event, statusOverride, onClose, onMoveToTrash }: DetailsModalProps) {
    const { opacity, scale } = useOverlayAnim(isVisible, 'scale');
    const statusColor = STATUS_COLORS[event.status];
    const statusIcon = STATUS_ICONS[event.status];
    const statusLabel = statusOverride ?? capitalize(event.status);
    const deletionDate = event.status === 'deleted' ? formatTimestamp(event.updatedAt) : null;
    return (
        <Modal visible={isVisible} transparent animationType="none">
            <Animated.View style={[styles.overlay, { opacity }]}>
                <View style={styles.blur} />
                <View style={styles.wrapper}>
                    <Animated.View style={[styles.panel, { transform: [{ scale }] }]}>
                        <View style={[styles.panelHeader, { borderBottomColor: statusColor }]}>
                            <View style={[styles.statusIcon, { backgroundColor: statusColor + '22', borderColor: statusColor + '66' }]}>
                                <Ionicons name={statusIcon as any} size={18} color={statusColor} />
                            </View>
                            <PlayerText style={styles.panelTitle} numberOfLines={2}>{event.title}</PlayerText>
                        </View>
                        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                            <View style={styles.detailRow}>
                                <PlayerText style={styles.detailLabel}>Status:</PlayerText>
                                <PlayerText style={[styles.detailValue, { color: statusColor }]}>{statusLabel}</PlayerText>
                            </View>
                            {event.priority && (
                                <View style={styles.detailRow}>
                                    <PlayerText style={styles.detailLabel}>Priority:</PlayerText>
                                    <PlayerText style={[styles.detailValue, { color: PRIORITY_COLORS[event.priority] ?? '#8EA7C1' }]}>
                                        {PRIORITY_LABELS[event.priority] ?? event.priority}
                                    </PlayerText>
                                </View>
                            )}
                            <View style={styles.detailRow}>
                                <PlayerText style={styles.detailLabel}>Description:</PlayerText>
                                <PlayerText style={[styles.detailValue, styles.descriptionValue]}>
                                    {event.description || 'No description provided.'}
                                </PlayerText>
                            </View>
                            <View style={styles.detailRow}>
                                <PlayerText style={styles.detailLabel}>Notes:</PlayerText>
                                <PlayerText style={[styles.detailValue, styles.notesValue, !event.notes?.trim() && styles.detailValueEmpty]}>
                                    {event.notes?.trim() || 'None'}
                                </PlayerText>
                            </View>
                            <View style={styles.detailRowGroup}>
                                <View style={[styles.detailRow, styles.flex]}>
                                    <PlayerText style={styles.detailLabel}>Start Date:</PlayerText>
                                    <PlayerText style={styles.detailValue}>{formatTimestamp(event.createdAt)}</PlayerText>
                                </View>
                                <View style={[styles.detailRow, styles.flex]}>
                                    <PlayerText style={styles.detailLabel}>Last Updated:</PlayerText>
                                    <PlayerText style={styles.detailValue}>{formatTimestamp(event.updatedAt)}</PlayerText>
                                </View>
                            </View>
                            <View style={styles.detailRowGroup}>
                                {event.endDate ? (
                                    <View style={[styles.detailRow, styles.flex]}>
                                        <PlayerText style={styles.detailLabel}>Due Until:</PlayerText>
                                        <PlayerText style={[styles.detailValue, styles.detailValueDue]}>{formatDateShort(event.endDate)}</PlayerText>
                                    </View>
                                ) : null}
                                <View style={[styles.detailRow, styles.flex]}>
                                    <PlayerText style={styles.detailLabel}>Deletion Date:</PlayerText>
                                    <PlayerText style={[styles.detailValue, deletionDate ? styles.deletionValue : styles.detailValueEmpty]}>
                                        {deletionDate ?? 'N/A'}
                                    </PlayerText>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.panelFooter}>
                            <Pressable style={styles.closeButton} onPress={onClose}>
                                <Ionicons name="close-outline" size={18} color="#8EA7C1" />
                                <PlayerText style={styles.closeButtonText}>Close</PlayerText>
                            </Pressable>
                            {onMoveToTrash && (
                                <Pressable style={styles.trashButton} onPress={onMoveToTrash}>
                                    <Ionicons name="trash-outline" size={18} color="#FFCCCB" />
                                    <PlayerText style={styles.trashButtonText}>Move to Trash</PlayerText>
                                </Pressable>
                            )}
                        </View>
                    </Animated.View>
                </View>
            </Animated.View>
        </Modal>
    );
}