import BellIcon from '@assets/icons/fast-bell.svg';
import PenIcon from '@assets/icons/macro-pen.svg';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface FastCronometerProps {
    time: string;
    onPress: () => void;
    onPressButton: () => void;
    buttonState: boolean;
}

export default function FastCronometer({ time = '00:00', onPress, onPressButton, buttonState }: FastCronometerProps) {
    return (
        <HStack spacing={20} style={styles.container}>
            <TouchableOpacity style={styles.input} onPress={onPress}>
                <PenIcon width={20} color={Colors.light.gray} height={20} />
                <Heading style={textStyles.subtitle}>{time}</Heading>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: buttonState ? Colors.light['primary-500'] : Colors.light.gray },
                ]}
                onPress={onPressButton}
            >
                <BellIcon color={Colors.light.white} height={27} width={27} />
            </TouchableOpacity>
        </HStack>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderRadius: 10,
    },
    input: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.white,
        borderRadius: 10,
        paddingVertical: 16,
        gap: 10,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: Colors.light['primary-500'],
        height: 50,
        aspectRatio: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
