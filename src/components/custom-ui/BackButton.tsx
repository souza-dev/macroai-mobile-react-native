import ArrowIcon from '@assets/icons/button-left-arrow.svg';
import { Colors } from '@constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface BackButtonProps extends TouchableOpacityProps {
    size?: number;
    iconSize?: number;
    color?: string;
}

const BackButton = ({
    onPress,
    size = 44,
    iconSize = 21,
    color = Colors.light['secondary-500'],
    ...props
}: BackButtonProps) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Back"
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
