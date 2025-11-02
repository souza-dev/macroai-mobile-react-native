import { getDatabase, ref, remove } from '@react-native-firebase/database';

export async function deleteAllMessages(user: User, type: ChatType) {
    if (user === null || type === null) {
        throw new Error('Missing parameter');
    }
    const db = getDatabase();
    const messageRef = ref(db, `/chat/${user.uid}/${type}/`);
    await remove(messageRef);
}
