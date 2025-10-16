import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { deleteNote } from 'api/notes';

export default async function deleteNoteService(
    user: FirebaseAuthTypes.User,
    id: string,
    type: 'fitness' | 'macros' | 'nutrition' | 'recipes'
) {
    try {
        await deleteNote(user, id, type);
    } catch (error) {
        throw error;
    }
}
