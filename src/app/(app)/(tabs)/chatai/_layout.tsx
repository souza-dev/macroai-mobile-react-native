import { Stack } from 'expo-router';

export default function ChatStack() {
    return (
        <Stack
            screenOptions={({ navigation }) => ({
                headerShadowVisible: false,
                headerShown: false,
            })}
        >
            <Stack.Screen name="index" />
        </Stack>
    );
}
