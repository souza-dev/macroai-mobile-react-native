import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { deleteAllNotes } from 'api/notes';

export default async function deleteAllNotesService(
    user: FirebaseAuthTypes.User,

    type: 'fitness' | 'macros' | 'nutrition' | 'recipes'
) {
    try {
        await deleteAllNotes(user, type);
    } catch (error) {
        throw error;
    }
}
