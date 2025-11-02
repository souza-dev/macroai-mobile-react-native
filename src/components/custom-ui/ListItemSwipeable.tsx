// components/ListItem/SwipeableReanimated.tsx
import { Colors } from '@constants/Colors';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface SwipeAction {
    label: string;
    onPress: () => void;
    backgroundColor?: string;
    color?: string;
    width?: number;
}

interface ListItemSwipeableProps {
    title: string;
    subtitle?: string;
    onPress?: () => void;
    swipeActions?: SwipeAction[];
}

export default function ListItemSwipeable({ title, subtitle, onPress, swipeActions }: ListItemSwipeableProps) {
    return (
        <View style={{ overflow: 'hidden' }}>
            {swipeActions && (
                <View style={styles.actionsContainer}>
                    {swipeActions.map((action, index) => (
                        <Pressable
                            key={index}
                            onPress={action.onPress}
                            style={[
                                styles.actionButton,
                                {
                                    backgroundColor: action.backgroundColor || Colors.light['red'],
                                    width: action.width || 80,
                                },
                            ]}
                        >
                            <Text style={[styles.actionText, { color: action.color || '#fff' }]}>{action.label}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
            <Pressable onPress={onPress} style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        zIndex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    actionsContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        zIndex: 0,
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        fontWeight: '600',
        fontSize: 14,
    },
});
