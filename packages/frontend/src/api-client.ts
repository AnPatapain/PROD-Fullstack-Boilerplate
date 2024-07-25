import {Message} from "@app/models/src/Message.ts";

export const apiClient = {
    message: {
        getOne: (): Promise<Message> => sendRequest('GET', '/api/message'),
    }
}

async function sendRequest(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', endpoint: string) : Promise<any> {
    try {
        const response = await fetch(endpoint, {method});
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}