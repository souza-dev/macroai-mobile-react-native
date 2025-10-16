import React, { ComponentProps } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import Spinner from '@components/custom-ui/Spinner';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';

interface ButtonProps extends ComponentProps<typeof Pressable> {
    title?: string;
    loading?: boolean;
    iconLeft?: React.ReactNode | ((props: { color: string; size?: number }) => React.ReactNode);
    iconRight?: React.ReactNode | ((props: { color: string; size?: number }) => React.ReactNode);
    color?: string;
    height?: number;
    radius?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

function Button({
    title,
    loading,
    iconLeft,
    iconRight,
    color,
    height,
    radius,
    style,
    textStyle,
    ...props
}: ButtonProps) {
    const hasText = Boolean(title);
    const iconOnly = !hasText && (iconLeft || iconRight);
    const containerStyle: StyleProp<ViewStyle> = [
        {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: iconOnly ? 0 : 10,
            height: height ?? 50,
            borderTopLeftRadius: radius ?? 10,
            borderTopRightRadius: radius ?? 10,
            borderBottomLeftRadius: radius ?? 10,
            borderBottomRightRadius: radius ?? 10,
            backgroundColor: color ?? Colors.light['primary-500'],
            paddingHorizontal: iconOnly ? 0 : 10,
            flexWrap: 'nowrap', // mantém texto e ícones na mesma linha, mas o texto pode quebrar
        },
        style,
    ];

    const iconColor = (StyleSheet.flatten(textStyle)?.color as string) || 'white';

    const renderIcon = (icon?: React.ReactNode | ((props: { color: string; size?: number }) => React.ReactNode)) => {
        if (typeof icon === 'function') return icon({ color: iconColor, size: 20 });
        return icon;
    };

    return (
        <Pressable style={containerStyle} {...props}>
            {loading ? (
                <Spinner color={iconColor} />
            ) : (
                <>
                    {iconOnly ? (
                        renderIcon(iconLeft || iconRight) // centraliza um único ícone
                    ) : (
                        <>
                            {renderIcon(iconLeft)}
                            {hasText && (
                                <ButtonText style={textStyle} numberOfLines={2}>
                                    {title}
                                </ButtonText>
                            )}
                            {renderIcon(iconRight)}
                        </>
                    )}
                </>
            )}
        </Pressable>
    );
}

interface ButtonTextProps extends ComponentProps<typeof Text> {
    children: React.ReactNode;
    numberOfLines?: number;
}

export function ButtonText({ children, style, numberOfLines, ...props }: ButtonTextProps) {
    return (
        <Text style={[textStyles.button, style]} numberOfLines={numberOfLines} {...props}>
            {children}
        </Text>
    );
}

export default React.memo(Button);
