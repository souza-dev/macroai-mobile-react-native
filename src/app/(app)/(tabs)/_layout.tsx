import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@constants/Colors';

import AccountIcon from '@assets/icons/tab-account.svg';
import AddCaloriesICon from '@assets/icons/tab-addcalories.svg';
import ChatIcon from '@assets/icons/tab-chat.svg';
import FastIcon from '@assets/icons/tab-fast.svg';
import StatsIcon from '@assets/icons/tab-stats.svg';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                headerTitle: '',
                headerShown: false,
                tabBarActiveTintColor: Colors['light'].tint,
                tabBarInactiveTintColor: Colors['light'].icon,
                tabBarStyle: {
                    paddingTop: 12,
                    paddingHorizontal: 20,
                },
                tabBarIconStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarShowLabel: true,
            }}
        >
            <Tabs.Screen
                name="chatai/index"
                options={{
                    title: 'ChatAi',
                    tabBarIcon: ({ color, size }) => (
                        <ChatIcon testID="icon-chatai" width={size} height={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="fast/index"
                options={{
                    title: 'Fast',
                    tabBarIcon: ({ color, size }) => (
                        <FastIcon testID="icon-fast" width={size} height={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="addcalories/index"
                options={{
                    title: 'Account',
                    tabBarLabel: () => null,
                    tabBarItemStyle: {
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    tabBarIcon: ({ color, size }) => (
                        <View style={[styles.circle, { borderColor: color }]}>
                            <AddCaloriesICon testID="icon-add" width={size} height={size} color={Colors.light.white} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="stats/index"
                options={{
                    title: 'Statistics',
                    tabBarIcon: ({ color, size }) => (
                        <StatsIcon testID="icon-stats" width={size} height={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <AccountIcon testID="icon-account" width={size} height={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    circle: {
        backgroundColor: Colors.light['secondary-500'],
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
