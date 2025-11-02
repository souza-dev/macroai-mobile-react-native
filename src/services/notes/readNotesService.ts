import { readNotes } from 'api/notes';

export default async function readNotesService(user: User, type: NotesTypes) {
    const notes = await readNotes(user, type);
    return notes;
}
