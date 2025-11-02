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
import { useSession } from '@contexts/authContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { textStyles } from '@styles/textStyles';
import { RelativePathString, usePathname, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const primary = Colors.light['primary-500'];

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    route?: RelativePathString;
    onPress?: () => void;
}

const DrawerItem = ({ label, icon, route, onPress }: MenuItem) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = route && pathname === route;

    const handlePress = () => {
        if (route) router.navigate(route);
        if (onPress) onPress();
    };

    return (
        <Pressable onPress={handlePress} style={[styles.button, isActive && styles.activeButton]}>
            <View style={styles.icon}>{icon}</View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{label}</Text>
        </Pressable>
    );
};

function CustomDrawerContent(props: any) {
    const { signOut } = useSession();
    const contactLink = process.env.EXPO_PUBLIC_CONTACT_URL as string;

    const openLink = async (link: string) => {
        const supported = await Linking.canOpenURL(link);
        if (supported) {
            await Linking.openURL(link);
        } else {
            Alert.alert(`Don't know how to open this URL: ${link}`);
        }
    };

    const menuItems: MenuItem[] = [
        {
            label: 'Home',
            icon: <MaterialCommunityIcons name="home-circle-outline" size={24} color={primary} />,
            route: '(tabs)' as RelativePathString,
        },
        {
            label: 'Notes',
            icon: <NotesIcon width={24} height={24} color={primary} />,
            route: '/notes' as RelativePathString,
        },
        {
            label: 'My Recipes',
            icon: <RecipesIcon width={24} height={24} color={primary} />,
            route: '/notes/list/recipes' as RelativePathString,
        },
        {
            label: 'My Exercises',
            icon: <ExercisesIcon width={24} height={24} color={primary} />,
            route: '/notes/list/fitness' as RelativePathString,
        },
        {
            label: 'Delete Account',
            icon: <DeleteIcon width={24} height={24} color={primary} />,
            route: '/delete' as RelativePathString,
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
                <View style={{ alignItems: 'center' }}>
                    <DrawerImageLogo />
                </View>

                {/* ✅ Renderiza o menu usando o componente otimizado */}
                <View style={{ marginVertical: 30 }}>
                    {menuItems.map((item) => (
                        <DrawerItem key={item.label} {...item} />
                    ))}

                    <DrawerItem
                        label="Sign out"
                        icon={<SignoutIcon width={24} height={24} color={primary} />}
                        onPress={signOut}
                    />

                    <DrawerItem
                        label="Contact us"
                        icon={<ContactIcon width={24} height={24} color={primary} />}
                        onPress={() => openLink(contactLink)}
                    />
                </View>

                <ButtonGroup>
                    <Heading style={textStyles.subtitle} color={primary}>
                        Like this app?
                    </Heading>
                    <Button
                        textStyle={styles.socialButtonText}
                        title="Rate us on App Store"
                        iconLeft={({ color }) => <RateIcon color={color} />}
                    />
                    <Button
                        textStyle={styles.socialButtonText}
                        title="Send app to a friend"
                        iconLeft={({ color }) => <SendIcon color={color} />}
                    />
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
                name="(tabs)"
                options={{
                    drawerLabel: 'Home',
                    title: '',
                }}
            />
            <Drawer.Screen
                name="notes"
                options={{
                    drawerLabel: 'Notes',
                    title: '',
                }}
            />
            <Drawer.Screen
                name="notes/list/recipes"
                options={{
                    drawerLabel: 'Recipes',
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
        backgroundColor: Colors.light['primary-400'],
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
    socialButtonText: {
        color: '#fff',
    },
});
