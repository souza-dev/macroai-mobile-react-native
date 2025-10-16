import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { readMessage } from 'api/chat';

export default async function readMessageService(user: FirebaseAuthTypes.User, type: ChatType) {
    try {
        const data = await readMessage(user, type);
        return data;
    } catch (error) {
        throw error;
    }
}
