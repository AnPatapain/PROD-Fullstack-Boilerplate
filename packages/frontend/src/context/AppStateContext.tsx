import React, { createContext, useReducer } from "react"
import { v4 as uuid } from "uuid";

import { findItemIndexById, moveItem } from "@frontend/utils"
import { type DragItem } from "@frontend/types/DragItem.ts";

interface Task {
    id: string
    text: string
}

interface List {
    id: string
    text: string
    tasks: Task[]
}

interface AppState {
    lists: List[],
    draggedItem?: DragItem
}


interface AppStateContextProps {
    state: AppState
    dispatch: React.Dispatch<Action> // Add the dispatch property
}
export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
}

type Action =
    | {
        type: "ADD_LIST"
        payload: string
    }
    | {
        type: "ADD_TASK"
        payload: { text: string; taskId: string }
    }
    | {
        type: "MOVE_LIST"
        payload: {
            dragIndex: number
            hoverIndex: number
        }
    }
    | {
        type: "SET_DRAGGED_ITEM"
        payload: DragItem | undefined
    }
    | {
        type: "MOVE_TASK"
        payload: {
            dragIndex: number
            hoverIndex: number
            sourceColumn: string
            targetColumn: string
        }
    }
    | {
        type: "DELETE_TASK"
        payload: {
            taskId: string
            columnId: string
        }
    }
    | {
        type: "DELETE_COLUMN"
        payload: {
            columnId: string
        }

    }

const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            // Reducer logic here...
            const text = action.payload
            if (!text) {
                return state
            }
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: uuid(), text: text, tasks: [] }
                ]
            }
        }
        case "ADD_TASK": {
            const { text, taskId } = action.payload;
            if (!text) {
                return state
            }
            const targetLaneIndex = findItemIndexById(state.lists, taskId)
            const targetLane = state.lists[targetLaneIndex];

            const updatedTasks = [...targetLane.tasks, { id: uuid(), text: text }];

            const updatedLane = { ...targetLane, tasks: updatedTasks };

            const updatedLists = state.lists.map(list => list.id === taskId ? updatedLane : list);
            return {
                ...state,
                lists: updatedLists
            }
        }
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload
            return {
                ...state,
                lists: moveItem(state.lists, dragIndex, hoverIndex)
            }

        }
        case "SET_DRAGGED_ITEM": {
            return { ...state, draggedItem: action.payload }
        }

        case "MOVE_TASK": {
            const { dragIndex, hoverIndex, sourceColumn, targetColumn } = action.payload;

            const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn);
            const targetLaneIndex = findItemIndexById(state.lists, targetColumn);

            const sourceLane = state.lists[sourceLaneIndex];
            const targetLane = state.lists[targetLaneIndex];



            // Remove the task from the source column
            const updatedSourceTasks = [...sourceLane.tasks];
            const item = updatedSourceTasks.splice(dragIndex, 1)[0];

            let updatedTargetTasks: Task[] = [];
            // Insert the task into the target column at the specified index
            if (sourceColumn === targetColumn) {
                updatedTargetTasks = updatedSourceTasks;
            } else {
                // Otherwise, create a new copy of the tasks from the target column
                updatedTargetTasks = [...targetLane.tasks];
            }
            updatedTargetTasks.splice(hoverIndex, 0, item);

            // Update the source and target columns with the updated tasks
            const updatedSourceLane = { ...sourceLane, tasks: updatedSourceTasks };
            const updatedTargetLane = { ...targetLane, tasks: updatedTargetTasks };

            // Update the lists with the updated source and target columns
            const updatedLists = [...state.lists];
            updatedLists[sourceLaneIndex] = updatedSourceLane;
            updatedLists[targetLaneIndex] = updatedTargetLane;

            return {
                ...state,
                lists: updatedLists
            };
        }
        case "DELETE_TASK": {
            const { taskId, columnId } = action.payload;
            const targetLaneIndex = findItemIndexById(state.lists, columnId);
            const targetLane = state.lists[targetLaneIndex];

            const updatedTasks = targetLane.tasks.filter(task => task.id !== taskId);

            const updatedLane = { ...targetLane, tasks: updatedTasks };

            const updatedLists = state.lists.map(list => list.id === columnId ? updatedLane : list);
            return {
                ...state,
                lists: updatedLists
            }
        }
        case "DELETE_COLUMN": {
            const { columnId } = action.payload;
            const updatedLists = state.lists.filter(list => list.id !== columnId);
            return {
                ...state,
                lists: updatedLists
            }
        }
        default: {
            return state
        }
    }
}


const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData)
    console.log(state)
    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export { AppStateProvider }