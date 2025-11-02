import Body from '@components/custom-ui/Body';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { StyleSheet } from 'react-native';

interface StatisticCardProps {
    title: string;
    value: string | number;
}
export default function StatisticCard({ title, value }: StatisticCardProps) {
    return (
        <HStack style={styles.container}>
            <Body style={[textStyles.text, styles.title]}>{title}</Body>
            <Heading style={textStyles.subtitle}>{value}</Heading>
        </HStack>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        paddingHorizontal: 30,
        paddingVertical: 25,
        borderRadius: 10,
    },
    title: {
        flex: 1,
    },
});
