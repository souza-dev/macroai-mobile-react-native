import { getDatabase, push, ref, set } from '@react-native-firebase/database';

export async function createNote(user: User, data: Note, type?: NotesTypes) {
    if (user === null || data === null || type === null) {
        throw new Error('missing-parameter');
    }

    const db = getDatabase();
    const notesRef = ref(db, `/notes/${user.uid}/${type}`);
    const newNoteRef = push(notesRef);
    const newData = {
        ...data,
        id: newNoteRef.key, // salva o id no objeto
        timestamp: Date.now(), // opcional, mas útil pra ordenação
    };
    await set(newNoteRef, newData);
    return newData;
}
