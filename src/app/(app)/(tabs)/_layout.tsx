import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@constants/Colors';

import AccountIcon from '@assets/icons/tab-account.svg';
import AddCaloriesICon from '@assets/icons/tab-addcalories.svg';
import ChatIcon from '@assets/icons/tab-chat.svg';
import FastIcon from '@assets/icons/tab-fast.svg';
import StatsIcon from '@assets/icons/tab-stats.svg';
import { Platform, StyleSheet, View } from 'react-native';

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
                    height: Platform.OS === 'android' ? 85 : 90, // aumenta a altura pra incluir o círculo
                    paddingBottom: Platform.OS === 'android' ? 12 : 20,
                    paddingHorizontal: 20,
                    backgroundColor: Colors.light.white,
                    paddingTop: 15,
                    borderTopWidth: 0,
                    elevation: 10,
                    backgroundClip: 'green',
                },
                tabBarIconStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarShowLabel: true,
            }}
        >
            <Tabs.Screen
                name="chatai"
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
                    title: 'Add calories',
                    tabBarLabel: () => null,
                    tabBarItemStyle: {
                        alignSelf: 'center',
                    },

                    tabBarIcon: ({ color, size, focused }) => (
                        <View
                            style={[
                                styles.circle,
                                {
                                    backgroundColor: focused ? Colors.light['secondary-500'] : Colors.light.black,
                                },
                            ]}
                        >
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
            <Tabs.Screen name="notes/index" options={{ href: null }} />
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
