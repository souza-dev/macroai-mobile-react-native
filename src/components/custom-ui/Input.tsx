import { Colors } from '@constants/Colors';
import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TouchableOpacity, ViewStyle } from 'react-native';
import HStack from './HStack';

interface InputProps extends TextInputProps {
    iconLeft?: React.ReactNode | ((props: { color: string; size?: number }) => React.ReactNode);
    iconRight?: React.ReactNode | ((props: { color: string; size?: number }) => React.ReactNode);
    onPressIconLeft?: () => void;
    onPressIconRight?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    height?: number;
    radius?: number;
    color?: string;
}

export default function Input({
    iconLeft,
    iconRight,
    onPressIconLeft,
    onPressIconRight,
    containerStyle,
    style,
    height,
    radius,
    color,
    ...inputProps
}: InputProps) {
    const inputColor = Colors.light.black;
    const placeholderColor = Colors.light.gray;
    const iconColor = Colors.light.gray;

    const renderIcon = (
        icon?: React.ReactNode | ((props: { color: string; size?: number }) => React.ReactNode),
        onPress?: () => void
    ) => {
        if (!icon) return null;

        const element = typeof icon === 'function' ? icon({ color: iconColor, size: 20 }) : icon;

        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.iconContainer}>
                {element}
            </TouchableOpacity>
        );
    };

    return (
        <HStack
            style={[
                {
                    borderRadius: radius ?? 10,
                    backgroundColor: color ?? Colors.light.white,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    height: height ?? 55,
                },
                containerStyle,
            ]}
        >
            {renderIcon(iconLeft, onPressIconLeft)}
            <TextInput
                style={[styles.input, { color: inputColor }, style]}
                placeholderTextColor={placeholderColor}
                autoCapitalize="none"
                {...inputProps}
            />
            {renderIcon(iconRight, onPressIconRight)}
        </HStack>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: 26,
        paddingVertical: 19,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
});
