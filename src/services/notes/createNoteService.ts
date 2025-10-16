import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createNote } from 'api/notes';

export default async function createNoteService(
    user: FirebaseAuthTypes.User,
    data: Note,
    type: 'fitness' | 'macros' | 'nutrition' | 'recipes'
) {
    try {
        await createNote(user, data, type);
    } catch (error) {
        throw error;
    }
}
