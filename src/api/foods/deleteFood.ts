import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getDatabase, ref, remove } from '@react-native-firebase/database';

export async function deleteFood(user: FirebaseAuthTypes.User, id: string) {
    if (user === null) {
        throw new Error('Missing parameter');
    }
    const db = getDatabase();
    const messageRef = ref(db, `/foods/${user.uid}/${id}`);
    await remove(messageRef);
}
