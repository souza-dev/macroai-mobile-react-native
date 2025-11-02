import { deleteMessage } from 'api/chat';

export default async function deleteMessageService(user: User, id: string, type: ChatType) {
    try {
        await deleteMessage(user, id, type);
    } catch (error) {
        throw error;
    }
}
