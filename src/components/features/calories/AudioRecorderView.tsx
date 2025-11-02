import MicrophoneIcon from '@assets/icons/chat-microphone.svg';
import Body from '@components/custom-ui/Body';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import { Colors } from '@constants/Colors';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface AudioRecorderViewProps extends TouchableOpacityProps {
    recordingTime: string;
    message: string;
    loading?: boolean;
}

function AudioRecorderViewComponent({ recordingTime, message, loading, ...props }: AudioRecorderViewProps) {
    return (
        <HStack style={styles.container}>
            <View style={styles.cronometer}>
                {loading ? <Body>{message}</Body> : <Heading>{recordingTime}</Heading>}
            </View>

            <TouchableOpacity style={styles.button} accessibilityRole="button" activeOpacity={0.7} {...props}>
                <MicrophoneIcon width={24} height={24} color="white" />
            </TouchableOpacity>
        </HStack>
    );
}

export default memo(AudioRecorderViewComponent);

const styles = StyleSheet.create({
    container: {
        gap: 10, // substitui spacing={10}
    },
    cronometer: {
        backgroundColor: Colors.light.background,
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 60,
    },
    button: {
        backgroundColor: Colors.light.gray,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
