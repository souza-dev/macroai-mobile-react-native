import { getDatabase, ref, remove } from '@react-native-firebase/database';

export async function deleteAllFoods(user: User) {
    if (user === null) {
        throw new Error('Missing parameter');
    }
    const db = getDatabase();
    const messageRef = ref(db, `/foods/${user.uid}/`);
    await remove(messageRef);
}
