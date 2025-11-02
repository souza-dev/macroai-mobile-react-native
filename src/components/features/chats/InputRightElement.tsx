import MicrophoneIcon from '@assets/icons/chat-microphone.svg';
import SendIcon from '@assets/icons/chat-send.svg';
import { Colors } from '@constants/Colors';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface InputRightElementProps {
    inputText: string;
    onSend: () => void;
    startRec: () => void;
    stopRec: () => void;
    disabled?: boolean;
}

const InputRightElement = React.memo(
    ({ inputText, onSend, startRec, stopRec, disabled = false }: InputRightElementProps) => {
        const hasText = inputText.trim().length > 0;

        return (
            <TouchableOpacity
                disabled={disabled}
                style={[styles.button, disabled && styles.disabled]}
                onPress={hasText ? onSend : undefined}
                onPressIn={!hasText ? startRec : undefined}
                onPressOut={!hasText ? stopRec : undefined}
            >
                {hasText ? (
                    <SendIcon width={17} height={27} color={Colors.light.gray} />
                ) : (
                    <MicrophoneIcon width={17} height={27} color={Colors.light.gray} />
                )}
            </TouchableOpacity>
        );
    }
);

InputRightElement.displayName = 'InputRightElement';

const styles = StyleSheet.create({
    button: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
});

export default InputRightElement;
