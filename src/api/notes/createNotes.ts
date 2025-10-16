import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getDatabase, ref, set } from '@react-native-firebase/database';

export async function createNote(
    user: FirebaseAuthTypes.User,
    data: Note,
    type?: 'fitness' | 'macros' | 'nutrition' | 'recipes'
) {
    if (user === null || data === null || type === null) {
        throw new Error('Missing parameter');
    }

    const db = getDatabase();
    const noteRef = ref(db, `/notes/${user.uid}/${type}/${data.id}`);
    await set(noteRef, data);
}
