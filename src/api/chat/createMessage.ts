import { getDatabase, ref, set } from '@react-native-firebase/database';

export async function createMessage(user: User, data: FirebaseDatabaseMessage, type: ChatType) {
    if (user === null || data === null || type === null) {
        throw new Error('Missing parameter');
    }
    const db = getDatabase();
    const messageRef = ref(db, `/chat/${user.uid}/${type}/${data.id}`);

    await set(messageRef, data);
}
