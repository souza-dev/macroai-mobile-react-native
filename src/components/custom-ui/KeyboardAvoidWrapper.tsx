import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleProp,
    TouchableWithoutFeedback,
    ViewProps,
    ViewStyle,
} from 'react-native';

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
    const headerHeight = useHeaderHeight();

    const content = disableKeyboardDismissOnTouch ? (
        children
    ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {children}
        </TouchableWithoutFeedback>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[{ flex: 1 }, style]}
            keyboardVerticalOffset={headerHeight + keyboardOffset}
            {...rest}
        >
            {content}
        </KeyboardAvoidingView>
    );
}
