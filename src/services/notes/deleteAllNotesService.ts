import { deleteAllNotes } from 'api/notes';

export default async function deleteAllNotesService(user: User, type: NotesTypes) {
    try {
        await deleteAllNotes(user, type);
    } catch (error) {
        throw error;
    }
}
