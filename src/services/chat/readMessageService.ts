import { readMessage } from 'api/chat';

export default async function readMessageService(user: User, type: ChatType) {
    try {
        const data = await readMessage(user, type);
        return data;
    } catch (error) {
        throw error;
    }
}
