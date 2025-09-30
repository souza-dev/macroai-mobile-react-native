import { SplashScreenController } from '@components/custom-ui/splash';
import { SessionProvider, useSession } from '@contexts/authContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import '../locales';

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT,
});

export default function Root() {
    // Set up the auth context and render your layout inside of it.
    return (
        <SessionProvider>
            <SplashScreenController />
            <RootNavigator />
        </SessionProvider>
    );
}

function RootNavigator() {
    const { session } = useSession();
    // const session = null; // TODO: Replace with actual session logic
    useEffect(() => {
        console.log('Session changed:', session);
    }, [session]);

    const [fontsLoaded] = useFonts({
        InterRegular: require('@assets/fonts/Inter_28pt-Regular.ttf'),
        InterBold: require('@assets/fonts/Inter_28pt-Bold.ttf'),
        InterItalic: require('@assets/fonts/Inter_28pt-Italic.ttf'),
        InterBoldItalic: require('@assets/fonts/Inter_28pt-BoldItalic.ttf'),
    });

    if (!fontsLoaded) {
        return null; // ou pode mostrar uma tela de loading
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(app)" />
            </Stack.Protected>
            <Stack.Protected guard={!session}>
                <Stack.Screen name="index" />
            </Stack.Protected>
        </Stack>
    );
}
