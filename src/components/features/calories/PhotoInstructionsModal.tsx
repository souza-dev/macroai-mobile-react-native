import CheckIcon from '@assets/icons/add-calories-check.svg';
import CloseIcon from '@assets/icons/add-calories-circle-x.svg';
import PenIcon from '@assets/icons/macro-pen.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import Input from '@components/custom-ui/Input';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, ModalProps, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface PhotoInstructionsModalProps extends ModalProps {
    onPressTakePhoto?: () => Promise<void>;
    loading?: boolean;
    text?: string;
    onChangeText?: ((text: string) => void) | undefined;
    onPressOk?: (text: string) => Promise<void>;
    onPressEdit?: () => void;
}

export default function PhotoInstructionsModal({
    onPressTakePhoto,
    loading,
    text,
    onChangeText,
    onPressOk,
    onPressEdit,
    ...props
}: PhotoInstructionsModalProps) {
    const [state, setState] = useState<'instructions' | 'confirm' | 'edit'>('instructions');

    return (
        <Modal
            visible={props.visible}
            transparent
            animationType="fade" // ou "slide"
            onRequestClose={props.onRequestClose}
        >
            <TouchableWithoutFeedback onPress={props.onRequestClose}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        {state === 'instructions' && (
                            <Instructions
                                onPressTakePhoto={async () => {
                                    await onPressTakePhoto?.();
                                    setState('confirm');
                                }}
                                loading={loading}
                                {...props}
                            />
                        )}
                        {state === 'confirm' && (
                            <Confirm
                                text={text}
                                onPressOk={onPressOk}
                                onPressEdit={() => setState('edit')}
                                loading={loading}
                            />
                        )}
                        {state === 'edit' && (
                            <Edit
                                text={text}
                                onChangeText={onChangeText}
                                onPressOk={onPressOk}
                                onPressEdit={() => setState('edit')}
                                loading={loading}
                            />
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const Instructions = ({ onPressTakePhoto, loading, ...props }: PhotoInstructionsModalProps) => {
    return (
        <>
            <HStack style={styles.header}>
                <TouchableOpacity onPress={props.onRequestClose}>
                    <CloseIcon color={Colors.light['primary-400']} height={44} width={44} />
                </TouchableOpacity>
            </HStack>
            <VStack spacing={16}>
                <Heading>{'Add Your Hand'}</Heading>
                <Heading style={textStyles.subtitle}>{'For Best Results'}</Heading>
                <Body style={textStyles.text}>
                    For more accurate macro calculation, place your hand next to your food before taking the photo. This
                    helps our AI compare and better estimate the portion size and macros.
                </Body>
                <Image
                    style={styles.image}
                    source={require('@assets/images/photo-instructions.png')}
                    contentFit="cover"
                    transition={1000}
                />
                <Button
                    title={'Ok, I got it!'}
                    textStyle={{ color: Colors.light.white }}
                    iconLeft={({ color, size }) => <CheckIcon color={color} height={size} width={size} />}
                    onPress={onPressTakePhoto}
                    loading={loading}
                />
            </VStack>
        </>
    );
};

const Confirm = ({ text, onPressOk, onPressEdit, loading, ...props }: PhotoInstructionsModalProps) => {
    return (
        <>
            <VStack>
                <Body style={textStyles.text}>{text}</Body>
                <Heading style={textStyles.subtitle}>{'Is that correct?'}</Heading>
                <ButtonGroup>
                    <Button
                        title={'Yes, that’s correct.'}
                        textStyle={{ color: Colors.light.white }}
                        iconLeft={({ color, size }) => (
                            <CheckIcon color={Colors.light['primary-400']} height={size} width={size} />
                        )}
                        onPress={onPressOk}
                        loading={loading}
                    />
                    <Button
                        title={'No, edit manually.'}
                        textStyle={{ color: Colors.light.white }}
                        iconLeft={({ color, size }) => (
                            <PenIcon color={Colors.light['primary-400']} height={size} width={size} />
                        )}
                        onPress={onPressEdit}
                        loading={loading}
                    />
                </ButtonGroup>
            </VStack>
        </>
    );
};

const Edit = ({ text, onChangeText, onPressOk, onPressEdit, loading, ...props }: PhotoInstructionsModalProps) => {
    return (
        <VStack spacing={16}>
            <Input
                multiline={true}
                numberOfLines={10}
                color={Colors.light.background}
                value={text}
                onChangeText={onChangeText}
                containerStyle={{ height: 100 }}
            />
            <Button
                title={'Yes, now it’s correct.'}
                textStyle={{ color: Colors.light.white }}
                iconLeft={({ color, size }) => (
                    <CheckIcon color={Colors.light['primary-400']} height={size} width={size} />
                )}
                onPress={(state) => {
                    setEdit(false);
                    props.onRequestClose(state);
                }}
                loading={loading}
            />
        </VStack>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 100,
    },
    container: {
        width: '100%',
        backgroundColor: Colors.light.white,
        padding: 30,
        borderRadius: 10,
    },
    header: {
        marginBottom: 10,
    },
    image: {
        height: 150,
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
