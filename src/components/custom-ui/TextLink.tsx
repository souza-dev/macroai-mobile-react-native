import React, { useCallback } from 'react';
import { Alert, Linking, StyleProp, Text, TextStyle } from 'react-native';

interface OpenURLButtonProps {
    url: string;
    children?: React.ReactNode;
    style?: StyleProp<TextStyle>;
}

export default function TextLink({ url, style, children }: OpenURLButtonProps) {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);
    return (
        <Text style={style} onPress={handlePress}>
            {children}
        </Text>
    );
}
