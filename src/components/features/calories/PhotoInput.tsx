import ButtonGroup from '@components/custom-ui/ButtonGroup';
import Heading from '@components/custom-ui/Heading';
import { Colors } from '@constants/Colors';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface PhotoInputProps {
    onPressUpload: () => void;
    onPressTakePhoto: () => void;
}
export default function PhotoInput({ onPressUpload, onPressTakePhoto }: PhotoInputProps) {
    return (
        <ButtonGroup direction="row">
            <TouchableOpacity style={styles.photoButton} onPress={onPressUpload}>
                <Heading>{'Upload photo'}</Heading>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButton} onPress={onPressTakePhoto}>
                <Heading>{'Take a photo'}</Heading>
            </TouchableOpacity>
        </ButtonGroup>
    );
}

const styles = StyleSheet.create({
    photoButton: {
        backgroundColor: Colors.light['primary-500'],
        padding: 30,
        borderRadius: 10,
    },
});
