import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getDatabase, ref, remove } from '@react-native-firebase/database';

export async function deleteNote(
    user: FirebaseAuthTypes.User,
    id: string,
    type?: 'fitness' | 'macros' | 'nutrition' | 'recipes'
) {
    if (user === null || id === null || type === null) {
        throw new Error('Missing parameter');
    }

    const db = getDatabase();
    const noteRef = ref(db, `/notes/${user.uid}/${type}/${id}`);
    await remove(noteRef);
}
