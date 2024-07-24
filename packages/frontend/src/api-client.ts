import {SampleModel} from "@app/models/SampleModel.ts";

export const apiClient = {
    sample: {
        getOne: (): Promise<SampleModel> => sendRequest('GET', '/api/sample'),
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