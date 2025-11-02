import CheckIcon from '@assets/icons/add-calories-check.svg';
import PenIcon from '@assets/icons/macro-pen.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import Heading from '@components/custom-ui/Heading';
import Input from '@components/custom-ui/Input';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { useState } from 'react';
import { Modal, ModalProps, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface ConfirmPhotoModalProps extends ModalProps {
    initialText: string;
    onPress: () => void;
    loading: boolean;
}

export default function ConfirmPhotoModal({ initialText, onPress, loading, ...props }: ConfirmPhotoModalProps) {
    const [text, setText] = useState(initialText);
    const [edit, setEdit] = useState(false);

    // useEffect(() => {
    //     setText(initialText);
    // }, []);

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
                        {edit === true ? (
                            <VStack spacing={16}>
                                <Input
                                    multiline={true}
                                    numberOfLines={10}
                                    color={Colors.light.background}
                                    value={text}
                                    onChangeText={setText}
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
                        ) : (
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
                                        onPress={onPress}
                                        loading={loading}
                                    />
                                    <Button
                                        title={'No, edit manually.'}
                                        textStyle={{ color: Colors.light.white }}
                                        iconLeft={({ color, size }) => (
                                            <PenIcon color={Colors.light['primary-400']} height={size} width={size} />
                                        )}
                                        onPress={() => setEdit(true)}
                                        loading={loading}
                                    />
                                </ButtonGroup>
                            </VStack>
                        )}
                    </View>
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
