import ScanFoodIcon from '@assets/icons/camera-scanfood.svg';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import HStack from '@components/custom-ui/HStack';
import { Colors } from '@constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ModalPhotoUploadHelp from './ModalPhotoUploadHelp';

interface ScanFoodCameraViewProps {
    cameraRef: React.RefObject<CameraView | null>;
    takePhoto: () => void;
    onClose: () => void;
}

export default function ScanFoodCameraView({ cameraRef, takePhoto, onClose }: ScanFoodCameraViewProps) {
    const insets = useSafeAreaInsets();
    const [visible, setVisible] = useState(false);
    return (
        <View>
            <ModalPhotoUploadHelp
                visible={visible}
                onRequestClose={() => {
                    setVisible(false);
                }}
                onPress={() => {
                    setVisible(false);
                }}
            />
            <CameraView
                style={styles.container}
                ref={cameraRef}
                mode={'picture'}
                facing={'back'}
                mute={false}
                responsiveOrientationWhenOrientationLocked
            />
            <HStack style={[styles.header, { top: insets.top + 20 }]}>
                <TouchableOpacity onPress={onClose}>
                    <Ionicons name="close-circle-outline" size={40} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Ionicons name="help-circle-outline" size={40} color="white" />
                </TouchableOpacity>
            </HStack>

            <ButtonGroup style={styles.buttonGroup}>
                <Button
                    onPress={takePhoto}
                    title="Scan Food"
                    iconLeft={({ color }) => <ScanFoodIcon color={Colors.light.black} height={23} width={23} />}
                    style={styles.button}
                />
                <TouchableOpacity onPress={takePhoto}>
                    <Ionicons name="radio-button-on-sharp" size={100} color={'white'} />
                </TouchableOpacity>
            </ButtonGroup>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    header: {
        position: 'absolute',
        paddingHorizontal: 20,
    },
    buttonGroup: {
        width: '100%',
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'white',
        paddingHorizontal: 30,
    },
});
