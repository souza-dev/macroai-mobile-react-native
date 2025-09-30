import ArrowIcon from '@assets/icons/button-left-arrow.svg';
import { Colors } from '@constants/Colors';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface BackButtonProps extends TouchableOpacityProps {
    onPress: () => void;
    size?: number;
    iconSize?: number;
    color?: string;
}

const BackButton = ({
    onPress,
    size = 44,
    iconSize = 21,
    color = Colors.light['primary-500'],
    ...props
}: BackButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            {...props}
        >
            <ArrowIcon height={iconSize} width={iconSize} color={color} />
        </TouchableOpacity>
    );
};
export default React.memo(BackButton);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
