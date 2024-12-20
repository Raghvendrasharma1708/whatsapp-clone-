import { getMessages } from '../service/api.js';
export const getMessageDetails = async (communicateId, setMessages) => {
    if (communicateId) {
        let data = await getMessages(communicateId);
        // console.log(data)
        setMessages(data);
    }
};