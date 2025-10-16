import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createMacros } from 'api/macros';

export default async function createMacrosService(user: FirebaseAuthTypes.User, data: FirebaseDatabaseMacros) {
    try {
        await createMacros(user, data);
    } catch (error) {
        throw error;
    }
}
