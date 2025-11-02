import CheckIcon from '@assets/icons/add-calories-check.svg';
import PenIcon from '@assets/icons/macro-pen.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import Heading from '@components/custom-ui/Heading';
import Input from '@components/custom-ui/Input';
import KeyboardAvoidWrapper from '@components/custom-ui/KeyboardAvoidWrapper';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { useState } from 'react';
import { Modal, ModalProps, StyleSheet, TextInputProps, View } from 'react-native';

interface ModalConfirmPhotoProps extends ModalProps, Omit<TextInputProps, keyof ModalProps> {
    onPress: () => Promise<void>;
    loading: boolean;
}

export default function ModalConfirmPhoto({ onPress, loading, ...props }: ModalConfirmPhotoProps) {
    const [edit, setEdit] = useState(false);
    return (
        <Modal visible={props.visible} transparent animationType="fade" onRequestClose={props.onRequestClose}>
            <KeyboardAvoidWrapper>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        {edit === true ? (
                            <VStack spacing={16}>
                                <Input
                                    multiline={true}
                                    numberOfLines={10}
                                    color={Colors.light.background}
                                    value={props.value}
                                    onChangeText={props.onChangeText}
                                    containerStyle={{ height: 250, paddingVertical: 20 }}
                                />
                                <Button
                                    title={'Yes, now it’s correct.'}
                                    textStyle={{ color: Colors.light.white }}
                                    iconLeft={({ color, size }) => (
                                        <CheckIcon color={Colors.light['primary-400']} height={size} width={size} />
                                    )}
                                    onPress={async () => {
                                        props.onRequestClose?.({} as any);
                                        await onPress();
                                    }}
                                    loading={loading}
                                />
                            </VStack>
                        ) : (
                            <VStack spacing={20}>
                                <Body style={[textStyles.text, { marginBottom: 30 }]}>{props.value}</Body>
                                <Heading style={textStyles.subtitle}>{'Is that correct?'}</Heading>
                                <ButtonGroup>
                                    <Button
                                        title={'Yes, that’s correct.'}
                                        textStyle={{ color: Colors.light.white }}
                                        iconLeft={({ color, size }) => (
                                            <CheckIcon color={Colors.light['primary-400']} height={size} width={size} />
                                        )}
                                        onPress={async () => {
                                            props.onRequestClose?.({} as any);
                                            await onPress();
                                        }}
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
            </KeyboardAvoidWrapper>
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
        width: '100%',
        backgroundColor: Colors.light.white,
        padding: 30,
        borderRadius: 10,
    },
});
