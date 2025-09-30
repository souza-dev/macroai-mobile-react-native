import HStack from '@components/custom-ui/HStack';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header({
    children,
    style,
    containerStyle,
}: {
    children: React.ReactNode;
    style?: ViewStyle;
    containerStyle?: ViewStyle;
}) {
    return (
        <SafeAreaView style={[styles.container, containerStyle]}>
            <HStack style={style}>{children}</HStack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
});
