import { createMessage } from 'api/chat';

export default async function createMessageService(user: User, data: FirebaseDatabaseMessage, type: ChatType) {
    try {
        await createMessage(user, data, type);
    } catch (error) {
        throw error;
    }
}
