import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getDatabase, ref, set } from '@react-native-firebase/database';

export async function createMacros(user: FirebaseAuthTypes.User, data: FirebaseDatabaseMacros) {
    if (user === null || data === null) {
        throw new Error('Missing parameter');
    }
    const db = getDatabase();
    const messageRef = ref(db, `/macros/${user.uid}/${data.id}`);

    await set(messageRef, data);
}
