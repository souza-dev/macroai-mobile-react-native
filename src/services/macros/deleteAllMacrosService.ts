import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { deleteAllMacros } from 'api/macros';

export default async function deleteAllMessagesService(user: FirebaseAuthTypes.User) {
    try {
        await deleteAllMacros(user);
    } catch (error) {
        throw error;
    }
}
