import CheckIcon from '@assets/icons/add-calories-check.svg';
import CloseIcon from '@assets/icons/add-calories-circle-x.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { Image } from 'expo-image';
import { Modal, ModalProps, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface ModalPhotoUploadProps extends ModalProps {
    onPress: () => void;
}

export default function ModalPhotoUploadHelp({ onPress, ...props }: ModalPhotoUploadProps) {
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
                        <HStack style={styles.header}>
                            <TouchableOpacity onPress={props.onRequestClose}>
                                <CloseIcon color={Colors.light['primary-400']} height={44} width={44} />
                            </TouchableOpacity>
                        </HStack>
                        <VStack spacing={16}>
                            <Heading>{'Add Your Hand'}</Heading>
                            <Heading style={textStyles.subtitle}>{'For Best Results'}</Heading>
                            <Body style={textStyles.text}>
                                For more accurate macro calculation, place your hand next to your food before taking the
                                photo. This helps our AI compare and better estimate the portion size and macros.
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
                                onPress={onPress}
                            />
                        </VStack>
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
});
