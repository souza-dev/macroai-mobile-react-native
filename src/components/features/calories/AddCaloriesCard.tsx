import ArrowIcon from '@assets/icons/add-caloris-right-arrow.svg';
import Body from '@components/custom-ui/Body';
import Heading from '@components/custom-ui/Heading';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function AddCaloriesCard({
    title,
    body,
    icon,
    onPress,
}: {
    title: string;
    body: string;
    onPress: () => void;
    icon?: React.ReactNode;
}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon}
            <VStack style={styles.label}>
                <Heading style={textStyles.subtitle}>{title}</Heading>
                <Body style={[textStyles.text, styles.body]}>{body}</Body>
            </VStack>
            <ArrowIcon width={12} height={12} color={Colors.light.black} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: Colors.light['secondary-500'],
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        width: '100%',
    },
    label: {
        flex: 1,
    },
    body: {
        textAlign: 'left',
    },
});
