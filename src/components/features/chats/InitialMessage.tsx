import HStack from '@components/custom-ui/HStack';
import Heading from '@components/custom-ui/Heading';
import VStack from '@components/custom-ui/VStack';
import { textStyles } from '@styles/textStyles';
import React from 'react';
import { StyleSheet } from 'react-native';

interface InitialMessageProps {
    title: string;
    children: React.ReactNode;
}

const InitialMessage = React.memo(({ title, children }: InitialMessageProps) => {
    return (
        <VStack spacing={20} style={styles.container}>
            <Heading style={textStyles.subtitle}>{title}</Heading>
            <HStack spacing={10}>{children}</HStack>
        </VStack>
    );
});

export default InitialMessage;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
    },
});
