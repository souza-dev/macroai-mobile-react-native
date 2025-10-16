import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { deleteMessage } from 'api/chat';

export default async function deleteMessageService(user: FirebaseAuthTypes.User, id: string, type: ChatType) {
    try {
        await deleteMessage(user, id, type);
    } catch (error) {
        throw error;
    }
}
