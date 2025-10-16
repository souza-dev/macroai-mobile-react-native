import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createMessage } from 'api/chat';

export default async function createMessageService(
    user: FirebaseAuthTypes.User,
    data: FirebaseDatabaseMessage,
    type: ChatType
) {
    try {
        await createMessage(user, data, type);
    } catch (error) {
        throw error;
    }
}
