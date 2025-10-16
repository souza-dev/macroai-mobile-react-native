import BackButton from '@components/custom-ui/BackButton';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import VStack from '@components/custom-ui/VStack';
import { textStyles } from '@styles/textStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ChatHeaderProps {
    icon: React.ReactNode;
    title: string;
    showBackButton?: boolean;
    center?: boolean;
}

const ChatHeader = ({ icon, title, showBackButton = true, center = true }: ChatHeaderProps) => {
    return (
        <Header>
            {showBackButton && <BackButton />}
            <VStack spacing={10} style={[styles.header, center && styles.center]}>
                <View style={styles.iconContainer}>{icon}</View>
                <Heading center style={textStyles.subtitle}>
                    {title}
                </Heading>
            </VStack>
        </Header>
    );
};

export default ChatHeader;

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingEnd: 44,
        marginVertical: 10,
    },
    center: {
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
