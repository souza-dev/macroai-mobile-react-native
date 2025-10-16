import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getDatabase, ref, remove } from '@react-native-firebase/database';

export async function deleteMessage(user: FirebaseAuthTypes.User, id: string, type: ChatType) {
    if (user === null || type === null) {
        throw new Error('Missing parameter');
    }
    const db = getDatabase();
    const messageRef = ref(db, `/chat/${user.uid}/${type}/${id}`);
    await remove(messageRef);
}
