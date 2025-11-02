import { createNote } from 'api/notes';

export default async function createNoteService(user: User, data: Note, type: NotesTypes) {
    try {
        await createNote(user, data, type);
    } catch (error) {
        throw error;
    }
}
