import { useEffect, useState } from "react";
import { apiClient } from "./api-client";
import { getToDayISOString } from "../shared/utils";

export const App = () => {
    const [display, setDisplay] = useState<string>('');
    
    useEffect(() => {
        const fetchData = async () => {
           const data = await apiClient.sample.getOne();
           setDisplay(data.message); 
        };
        fetchData();
    }, [])

    return <div>
        <p>{getToDayISOString()}</p>
        <p>With youtrack-github workflow</p>
        {display}
    </div>
}

