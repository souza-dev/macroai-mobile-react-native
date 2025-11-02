import { deleteAllMessages } from 'api/chat';

export default async function deleteAllMessagesService(user: User, type: ChatType) {
    try {
        await deleteAllMessages(user, type);
    } catch (error) {
        throw error;
    }
}
