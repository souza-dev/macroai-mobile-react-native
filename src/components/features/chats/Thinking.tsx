import Body from '@components/custom-ui/Body';
import HStack from '@components/custom-ui/HStack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TypingAnimation } from 'react-native-typing-animation';

interface ThinkingProps {
    loading: boolean;
}

const Thinking = React.memo(({ loading }: ThinkingProps) => {
    if (!loading) return null;

    return (
        <HStack style={styles.container}>
            <Body>Thinking...</Body>
            <TypingAnimation
                dotColor="black"
                dotMargin={3}
                dotAmplitude={3}
                dotSpeed={0.15}
                dotRadius={2.5}
                dotX={12}
                dotY={6}
            />
        </HStack>
    );
});

Thinking.displayName = 'Thinking';

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 5,
        minHeight: 20,
    },
});

export default Thinking;
