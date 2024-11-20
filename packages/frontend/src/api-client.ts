import {User} from "./DTO/User.ts";

export const apiClient = {
    user: {
        getAll: (): Promise<Array<User>> => sendRequest('GET', '/api/users'),
        getOneById: (id: number ): Promise<User> => sendRequest('GET', `/api/users/${id}`),
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
