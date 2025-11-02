import { deleteNote } from 'api/notes';

export default async function deleteNoteService(user: User, id: string, type: NotesTypes) {
    try {
        await deleteNote(user, id, type);
    } catch (error) {
        throw error;
    }
}
