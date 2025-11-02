/* eslint-disable react-native/no-inline-styles */
import { Colors } from '@constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ChatMessageProps {
    id: string;
    role: string;
    content: string;
    onPress?: (id: string) => void | undefined;
    icon?: React.ReactNode;
    timestamp?: string;
    disabled?: boolean;
}

function ChatMessage({ id, role, content, onPress, icon, timestamp, disabled }: ChatMessageProps) {
    const containerStyle =
        role === 'assistant'
            ? ({
                  justifyContent: 'flex-start',
              } as ViewStyle)
            : ({
                  justifyContent: 'flex-end',
              } as ViewStyle);

    let bubbleStyle;

    switch (role) {
        case 'user':
            bubbleStyle = { backgroundColor: Colors.light['primary-400'], borderBottomRightRadius: 0 };
            break;
        case 'assistant':
            bubbleStyle = {
                backgroundColor: Colors.light.background,
                borderBottomLeftRadius: 0,
            };
            break;
        case 'exercise':
            bubbleStyle = {
                backgroundColor: '#EBFFCA',
                borderColor: '#D4D4D4',
                borderWidth: 1,
            };
            break;
        default:
            bubbleStyle = {
                backgroundColor: '#FFFFFF',
                borderColor: '#D4D4D4',
                borderWidth: 1,
            };
    }
    const dateAndTime = timestamp ? new Date(parseInt(timestamp, 10)) : null;

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.bubbleContainer, bubbleStyle]}>
                <Text style={[styles.text]}>{content}</Text>
                {dateAndTime && (
                    <View style={styles.timeStampContainer}>
                        <Text style={[styles.timeStamp]}>
                            {dateAndTime.toLocaleDateString() + ' - ' + dateAndTime.toLocaleTimeString()}
                        </Text>
                    </View>
                )}
            </View>
            {onPress && !disabled && (
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => onPress(id)} style={{ marginLeft: 10 }}>
                        {icon}
                    </TouchableOpacity>
                </View>
            )}
            <View />
        </View>
    );
}

export default React.memo(ChatMessage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    bubbleContainer: {
        padding: 14,
        borderRadius: 10,
        maxWidth: '90%',
    },
    iconContainer: {},
    text: {
        fontFamily: 'Lato-Regular',
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 24,
        color: '#282828',
    },
    timestampContainer: {},
    timestampText: {},

    timeStampContainer: {
        flexDirection: 'row-reverse',
        paddingTop: 10,
    },
    timeStamp: {
        fontFamily: 'Lato-Regular',
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 20,
        color: '#282828',
    },
});
