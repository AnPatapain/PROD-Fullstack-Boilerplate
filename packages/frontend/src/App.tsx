
import { DragDropContext } from "react-beautiful-dnd";

import { AppContainer } from '@frontend/styles';
import { AddNewItem, DragColumn } from '@frontend/components';

import { useAppState } from '@frontend/hooks';
import { StrictModeDroppable } from '@frontend/utils/StrictModeDroppable';


export const App = () => {
    const { state, dispatch } = useAppState()
    const onDragEnd = (result: any) => {
        console.log(result)
        const { destination, source, type } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        switch (type) {
            case "column":
                dispatch({ type: "MOVE_LIST", payload: { dragIndex: source.index, hoverIndex: destination.index } });
                break
            case "card":
                dispatch({ type: "MOVE_TASK", payload: { dragIndex: source.index, hoverIndex: destination.index, sourceColumn: source.droppableId, targetColumn: destination.droppableId } })
                break
        }

    };
    return (

        <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="column" direction='horizontal' type='column'>
                {
                    provided => (
                        <AppContainer {...provided.droppableProps} ref={provided.innerRef}>
                            {state.lists.map((list, i) => (
                                <DragColumn id={list.id} text={list.text} key={list.id} index={i} />
                            ))}
                            <AddNewItem toggleButtonText='+ Add new list'
                                        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })} />
                            {provided.placeholder}
                        </AppContainer>
                    )
                }
            </StrictModeDroppable>
        </DragDropContext>
    );
}

