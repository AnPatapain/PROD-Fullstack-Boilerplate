export const apiClient = {
    helloworld: {
        getOne: () => sendRequest('GET', '/api/'),
    }
}

async function sendRequest(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', endpoint: string, data?: any) : Promise<any> {
    try {
        const response = await fetch(endpoint, {method});
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}