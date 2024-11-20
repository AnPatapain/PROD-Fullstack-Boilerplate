import { useEffect, useState } from "react";
import { apiClient } from "./api-client";
import {User} from "./DTO/User.ts";

export const App = () => {
    const [users, setUsers] = useState<User[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
           const users_ = await apiClient.user.getAll();
           setUsers(users_);
        };
        fetchData();
    }, [])

    return <div>
        <h3>Fullstack mern boilerplate powered by: Typescript, Node, React, Docker, Nginx, BashScript.</h3>
        <p>Users from API</p>
        {users.length === 0 ? 'Loading message from backend...' :
        <ul>
            {users.map((user) => <li>id: {user.id} - email: {user.email} - name: {user.name}</li>)}
        </ul>}
    </div>
}

