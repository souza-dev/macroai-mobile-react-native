import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={({ navigation }) => ({
                headerShadowVisible: false,
                headerShown: false,
            })}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="macro" />
        </Stack>
    );
}
