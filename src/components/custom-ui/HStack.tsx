import React, { ComponentProps } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface HStackProps extends ComponentProps<typeof View> {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    spacing?: number;
    color?: string;
}
export default function HStack({ children, style, spacing = 0, color = 'transparent' }: HStackProps) {
    return <View style={[styles.container, { gap: spacing, backgroundColor: color }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});
