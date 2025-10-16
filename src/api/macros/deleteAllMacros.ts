import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getDatabase, ref, remove } from '@react-native-firebase/database';

export async function deleteAllMacros(user: FirebaseAuthTypes.User) {
    if (user === null) {
        throw new Error('Missing parameter');
    }
    const db = getDatabase();
    const messageRef = ref(db, `/macros/${user.uid}/`);
    await remove(messageRef);
}
