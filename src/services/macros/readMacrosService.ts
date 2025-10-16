import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { readMacros } from 'api/macros';

export default async function readMessageService(user: FirebaseAuthTypes.User) {
    try {
        const data = await readMacros(user);
        return data;
    } catch (error) {
        throw error;
    }
}
