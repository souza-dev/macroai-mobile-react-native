import Button from '@components/custom-ui/Button';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import { Colors } from '@constants/Colors';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ChatAiScreen = () => (
    <View style={styles.container}>
        <Header style={styles.header}>
            <DrawerButton />
            <View style={styles.flex}>
                <Image
                    style={styles.image}
                    source={require('@assets/images/calories-logo.png')}
                    contentFit="contain"
                    transition={1000}
                />
            </View>
        </Header>
        <View style={styles.panel}></View>
        <Button title="Pressione-me" onPress={() => alert('Botão pressionado!')} />
    </View>
);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        paddingEnd: 44,
        height: 54,
    },
    image: {
        width: 120,
        height: 40,
        alignSelf: 'center',
    },
    panel: {
        backgroundColor: Colors.light.background,
        height: 189,
    },
});

export default ChatAiScreen;
