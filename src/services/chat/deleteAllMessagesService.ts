import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { deleteAllMessages } from 'api/chat';

export default async function deleteAllMessagesService(user: FirebaseAuthTypes.User, type: ChatType) {
    try {
        await deleteAllMessages(user, type);
    } catch (error) {
        throw error;
    }
}
