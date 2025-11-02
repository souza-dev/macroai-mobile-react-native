import { Colors } from '@constants/Colors';
import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';
import HStack from './HStack';

export interface InputProps extends TextInputProps {
    iconLeft?: React.ReactNode | ((props: { color: string; size?: number }) => React.ReactNode);
    iconRight?: React.ReactNode | ((props: { color: string; size?: number }) => React.ReactNode);
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    onPressIconLeft?: () => void;
    onPressIconRight?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    height?: number;
    radius?: number;
    color?: string;
    center?: boolean;
}

function Input({
    iconLeft,
    iconRight,
    leftElement,
    rightElement,
    onPressIconLeft,
    onPressIconRight,
    containerStyle,
    style,
    height,
    radius,
    color,
    center,
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
                    height: height ?? 50,
                },
                containerStyle,
            ]}
        >
            {leftElement ? (
                <View style={styles.elementContainer}>{leftElement}</View>
            ) : (
                renderIcon(iconLeft, onPressIconLeft)
            )}

            <TextInput
                style={[styles.input, { color: inputColor }, center ? null : { flex: 1 }, style]}
                placeholderTextColor={placeholderColor}
                autoCapitalize="none"
                {...inputProps}
            />

            {rightElement ? (
                <View style={styles.elementContainer}>{rightElement}</View>
            ) : (
                renderIcon(iconRight, onPressIconRight)
            )}
        </HStack>
    );
}

export default Input;

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 8,
        height: '100%',
    },
    iconContainer: {
        paddingHorizontal: 6,
    },
    elementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
});
