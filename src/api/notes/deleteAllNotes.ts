import { getDatabase, ref, remove } from '@react-native-firebase/database';

export async function deleteAllNotes(user: User, type?: NotesTypes) {
    if (user === null || type === null) {
        throw new Error('Missing parameter');
    }
    const db = getDatabase();
    const notesRef = ref(db, `/notes/${user.uid}/${type}`);
    await remove(notesRef);
}
