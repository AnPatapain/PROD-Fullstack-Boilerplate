import { useEffect, useState } from "react";
import { apiClient } from "./api-client";
import {Message} from "@app/models/src/SampleModel.ts";
import {getPrintableMessage} from "@app/shared/src/utils.ts";

export const App = () => {
    const [message, setMessage] = useState<Message | ''>('');
    
    useEffect(() => {
        const fetchData = async () => {
           const data = await apiClient.message.getOne();
           setMessage(data);
        };
        fetchData();
    }, [])

    return <div>
        <h3>Fullstack mern boilerplate powered by: Typescript, Node, React, Docker, Nginx, BashScript.</h3>
        <p>You dev, boilerplate handles the rest</p>
        {message ? getPrintableMessage(message) : 'Loading message...'}
    </div>
}

