import { useContext } from "react";
import { AppStateContext } from "@frontend/context/AppStateContext";

const useAppState = () => {
    return useContext(AppStateContext)
}

export default useAppState