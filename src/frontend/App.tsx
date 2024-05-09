import { useEffect, useState } from "react";
import { apiClient } from "./api-client";

export const App = () => {
    const [display, setDisplay] = useState<string>('');
    
    useEffect(() => {
        const fetchData = async () => {
           const data = await apiClient.helloworld.getOne();
           setDisplay(data.message); 
        };
        fetchData();
    }, [])

    return <div>
        {display}
    </div>
}

