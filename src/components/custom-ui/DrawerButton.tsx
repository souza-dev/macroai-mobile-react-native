import DrawerIcon from '@assets/icons/button-drawer.svg';
import { Colors } from '@constants/Colors';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const DrawerButton = () => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.drawerButton}>
            <DrawerIcon width={20} height={20} color={Colors.light.white} />
        </Pressable>
    );
};

export default React.memo(DrawerButton);

const styles = StyleSheet.create({
    drawerButton: {
        padding: 12,
        backgroundColor: Colors.light['secondary-500'],
        borderRadius: 100,
    },
});
