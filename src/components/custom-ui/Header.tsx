import HStack from '@components/custom-ui/HStack';
import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({
    children,
    style,
    containerStyle,
}: {
    children: React.ReactNode;
    style?: ViewStyle;
    containerStyle?: ViewStyle;
}) {
    const insets = useSafeAreaInsets()
    return (
        <View style={[{ paddingTop: insets.top, paddingBottom: 10 }, containerStyle]}>
            <HStack style={style}>{children}</HStack>
        </View>
    );
}


