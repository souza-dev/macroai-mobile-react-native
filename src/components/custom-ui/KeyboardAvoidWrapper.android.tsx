import { useHeaderHeight } from '@react-navigation/elements';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleProp, TouchableWithoutFeedback, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenWrapperProps extends ViewProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    disableKeyboardDismissOnTouch?: boolean;
    /** ajuste manual da altura que o conteúdo sobe quando o teclado aparece */
    keyboardOffset?: number;
}

export default function KeyboardAvoidWrapper({
    children,
    style,
    disableKeyboardDismissOnTouch = false,
    keyboardOffset = 0,
    ...rest
}: ScreenWrapperProps) {
    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();

    const [keyboardPadding, setKeyboardPadding] = useState(0);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
            // 🔹 Aplica o ajuste manual (negativo = sobe menos)
            setKeyboardPadding(Math.max(e.endCoordinates.height + keyboardOffset, 0));
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardPadding(0);
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, [keyboardOffset]);

    const content = (
        <View style={[{ flex: 1 }, style, { paddingBottom: keyboardPadding + insets.bottom }]} {...rest}>
            {children}
        </View>
    );

    return disableKeyboardDismissOnTouch ? (
        content
    ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {content}
        </TouchableWithoutFeedback>
    );
}
