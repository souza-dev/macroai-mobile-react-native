import { Colors } from '@constants/Colors';
import { StyleSheet, View, ViewProps } from 'react-native';

export default function Screen({ style, children, ...rest }: ViewProps) {
    return (
        <View style={[styles.container, style]} {...rest}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: Colors.light.white,
    },
});
