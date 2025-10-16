import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getDatabase, ref, remove } from '@react-native-firebase/database';

export async function deleteAllNotes(
    user: FirebaseAuthTypes.User,
    type?: 'fitness' | 'macros' | 'nutrition' | 'recipes'
) {
    if (user === null || type === null) {
        throw new Error('Missing parameter');
    }
    const db = getDatabase();
    const notesRef = ref(db, `/notes/${user.uid}/${type}`);
    await remove(notesRef);
}
