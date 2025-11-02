import CheckIcon from '@assets/icons/add-calories-check.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import Heading from '@components/custom-ui/Heading';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import React from 'react';
import { Modal, NativeSyntheticEvent, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface AddCaloriesModalProps {
    visible: boolean;
    title: string;
    body: string;
    buttonTitle: string;
    buttonOnPress: () => void;
    onRequestClose?: ((event: NativeSyntheticEvent<any>) => void) | undefined;
}
export default function InfoModal({
    visible,
    title,
    body,
    buttonTitle,
    buttonOnPress,
    onRequestClose,
}: AddCaloriesModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade" // ou "slide"
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={styles.overlay}>
                    <VStack style={styles.container} spacing={30}>
                        <Heading style={textStyles.title} center>
                            {title}
                        </Heading>
                        <View style={styles.bodyContainer}>
                            <Body style={[textStyles.text, { color: Colors.light.gray }]}>{body}</Body>
                        </View>
                        <Button
                            title={buttonTitle}
                            onPress={buttonOnPress}
                            iconLeft={({ color, size }) => <CheckIcon height={size} width={size} color={color} />}
                            textStyle={{ color: Colors.light.white }}
                        />
                    </VStack>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    container: {
        backgroundColor: Colors.light.white,
        paddingVertical: 20,
        paddingBottom: 50,
        paddingHorizontal: 24,
        width: '100%',
        borderRadius: 10,
    },
    bodyContainer: {
        backgroundColor: Colors.light.background,
        padding: 24,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
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
