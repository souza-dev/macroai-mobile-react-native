import { DataSnapshot, get, getDatabase, ref } from '@react-native-firebase/database';

export async function readNotes(user: User, type: NotesTypes): Promise<any[]> {
    if (user === null || type === null) {
        throw new Error('Missing parameter');
    }

    const db = getDatabase();
    const notesRef = ref(db, `/notes/${user.uid}/${type}`);
    const snapshot: DataSnapshot = await get(notesRef);
    const data: any[] = [];
    if (snapshot.exists()) {
        snapshot.forEach((item) => {
            data.push({
                id: item.key,
                ...item.val(),
            });
            return undefined;
        });
    }

    return data;
}
