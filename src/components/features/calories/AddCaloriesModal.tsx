import PhotoIcon from '@assets/icons/add-calories-photo.svg';
import TextIcon from '@assets/icons/add-calories-text.svg';
import VoiceIcon from '@assets/icons/add-calories-voice.svg';

import ButtonGroup from '@components/custom-ui/ButtonGroup';
import { Colors } from '@constants/Colors';
import React from 'react';
import { Modal, NativeSyntheticEvent, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import AddCaloriesCard from './AddCaloriesCard';

interface AddCaloriesModalProps {
    visible: boolean;
    onRequestClose?: ((event: NativeSyntheticEvent<any>) => void) | undefined;
    onSelect?: (type: 'photo' | 'text' | 'voice') => void;
}
export default function AddCaloriesModal({ visible, onRequestClose, onSelect }: AddCaloriesModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade" // ou "slide"
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={styles.overlay}>
                    <ButtonGroup>
                        <AddCaloriesCard
                            icon={<PhotoIcon color={Colors.light.white} width={30} height={30} />}
                            title={'Scan Food'}
                            body={'Just a photo is enough to calculate the calories in your food.'}
                            onPress={() => onSelect?.('photo')}
                        />
                        <AddCaloriesCard
                            icon={<TextIcon color={Colors.light.white} width={30} height={30} />}
                            title={'By text'}
                            body={'Describe your food and get the exact values.'}
                            onPress={() => onSelect?.('text')}
                        />
                        <AddCaloriesCard
                            icon={<VoiceIcon color={Colors.light.white} width={30} height={30} />}
                            title={'By voice'}
                            body={'Tell the bus what you ate and record it'}
                            onPress={() => onSelect?.('voice')}
                        />
                    </ButtonGroup>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 100,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        width: '80%',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 16,
    },
    closeButton: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
    },
});
