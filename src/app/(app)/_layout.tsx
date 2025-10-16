import ContactIcon from '@assets/icons/drawer-contact.svg';
import DeleteIcon from '@assets/icons/drawer-delete.svg';
import ExercisesIcon from '@assets/icons/drawer-exercises.svg';
import NotesIcon from '@assets/icons/drawer-notes.svg';
import RateIcon from '@assets/icons/drawer-rate.svg';
import RecipesIcon from '@assets/icons/drawer-recipes.svg';
import SendIcon from '@assets/icons/drawer-send.svg';
import SignoutIcon from '@assets/icons/drawer-signout.svg';
import DrawerImageLogo from '@assets/images/drawer-logo.svg';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import Heading from '@components/custom-ui/Heading';
import { Colors } from '@constants/Colors';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { textStyles } from '@styles/textStyles';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function CustomDrawerContent(props: any) {
    const menuItems = [
        {
            label: 'Notes',
            icon: <NotesIcon width={24} height={24} color={Colors.light['primary-500']} />,
            route: '/notes',
        },
        {
            label: 'My Recipes',
            icon: <RecipesIcon width={24} height={24} color={Colors.light['primary-500']} />,
            route: '/recipes',
        },
        {
            label: 'My Exercises',
            icon: <ExercisesIcon width={24} height={24} color={Colors.light['primary-500']} />,
            route: '/exercises',
        },
        {
            label: 'Contact us',
            icon: <ContactIcon width={24} height={24} color={Colors.light['primary-500']} />,
            route: '/contact',
        },
        {
            label: 'Signout',
            icon: <SignoutIcon width={24} height={24} color={Colors.light['primary-500']} />,
            route: '/signout',
        },
        {
            label: 'Delete Account',
            icon: <DeleteIcon width={24} height={24} color={Colors.light['primary-500']} />,
            route: '/delete',
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
                <View style={{ alignItems: 'center' }}>
                    <DrawerImageLogo />
                </View>
                <View style={{ marginVertical: 30 }}>
                    {menuItems.map((item) => {
                        const isActive = props.state.routeNames[props.state.index] === item.route;

                        return (
                            <Pressable
                                key={item.route}
                                onPress={() => props.navigation.navigate(item.route)}
                                style={[styles.button, isActive && styles.activeButton]}
                            >
                                <View style={styles.icon}>{item.icon}</View>
                                <Text style={[styles.label, isActive && styles.activeLabel]}>{item.label}</Text>
                            </Pressable>
                        );
                    })}
                </View>
                <ButtonGroup>
                    <Heading style={textStyles.subtitle} color={Colors.light['primary-500']}>
                        Like this app?
                    </Heading>
                    <Button title="Rate us on App Store" iconLeft={({ color }) => <RateIcon color={color} />} />
                    <Button title="Send app to a friend" iconLeft={({ color }) => <SendIcon color={color} />} />
                </ButtonGroup>
            </DrawerContentScrollView>
        </SafeAreaView>
    );
}

export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShadowVisible: false,
                headerShown: false,
            }}
        >
            <Drawer.Screen
                name="(tabs)" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Home',
                    title: '',
                }}
            />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    scroll: {
        paddingTop: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 10,
    },
    activeButton: {
        backgroundColor: '#6200ee',
    },
    icon: {
        marginRight: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    activeLabel: {
        color: '#fff',
        fontWeight: '700',
    },
});
