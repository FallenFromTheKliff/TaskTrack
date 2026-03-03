import { useState, useRef } from 'react';
import { View, Image, Modal } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLoadingText } from '@/hooks/main/useLoadingText';
import { useTimedMessage } from '@/hooks/auth/useTimedMessage';
import { makeSelfieCameraStyles } from '@/styles/modals/SelfieCameraStyles';
import PlayerButton from '@/components/fields/PlayerButton';

type SelfieCameraModalProps = {
    isVisible: boolean;
    onCancel: () => void;
    onCapture: (uri: string) => void;
};

export default function SelfieCameraModal({ isVisible, onCancel, onCapture }: SelfieCameraModalProps) {
    const { colors } = useTheme();
    const styles = makeSelfieCameraStyles(colors);
    const [permission, requestPermission] = useCameraPermissions();
    const [isSaving, setIsSaving] = useState(false);
    const [frozenUri, setFrozenUri] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const savingText = useLoadingText('SAVING', isSaving);
    const { message: errorText, showMessage: showError } = useTimedMessage(2000);

    const handleTakePhoto = async () => {
        if (isSaving || !cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.7, base64: false });
            if (!photo) return;
            setFrozenUri(photo.uri);
            setIsSaving(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            onCapture(photo.uri);
            setIsSaving(false);
            setFrozenUri(null);
        } catch {
            setIsSaving(false);
            setFrozenUri(null);
            showError('Could not capture photo.');
        }
    };

    const handleCancel = () => {
        if (isSaving) return;
        setFrozenUri(null);
        onCancel();
    };

    if (!isVisible) return null;

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.blur} />
                {!permission ? (
                    <View style={styles.permissionBox}>
                        <PlayerText style={styles.permissionText}>Checking camera permissions...</PlayerText>
                    </View>
                ) : !permission.granted ? (
                    <View style={styles.permissionBox}>
                        <Ionicons name="camera-outline" size={48} color="#4E5D6D" />
                        <PlayerText style={styles.permissionText}>Camera access is required to take a photo!</PlayerText>
                        <PlayerButton
                            variant="primary"
                            label="Grant Permission"
                            onPress={requestPermission}
                        />
                        <PlayerButton
                            variant="ghost"
                            label="Cancel"
                            onPress={handleCancel}
                        />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.viewfinder}>
                            {frozenUri ? (
                                <Image source={{ uri: frozenUri }} style={styles.frozenPreview} />
                            ) : (
                                <CameraView ref={cameraRef} style={styles.camera} facing={'front' as CameraType} mirror={true} />
                            )}
                        </View>
                        {errorText ? (
                            <View style={styles.errorBar}>
                                <PlayerText style={styles.errorText}>{errorText}</PlayerText>
                            </View>
                        ) : null}
                        <View style={styles.actions}>
                            <PlayerButton
                                variant={isSaving ? 'ghost' : 'primary'}
                                label={isSaving ? savingText : 'Take Photo!'}
                                onPress={handleTakePhoto}
                                icon="camera-outline"
                                iconSize={22}
                                disabled={isSaving}
                            />
                            <PlayerButton
                                variant="ghost"
                                label="Cancel"
                                onPress={handleCancel}
                                disabled={isSaving}
                            />
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
}