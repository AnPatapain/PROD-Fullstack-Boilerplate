
import { ColumnContainer, ColumnTitle, DeleteButton } from "@frontend/styles";
import AddNewItem from "./AddNewItem";
import { useAppState } from "@frontend/hooks";
import Card from "./Card";
import { StrictModeDroppable } from "@frontend/utils/StrictModeDroppable";


interface ColumnProp {
    text: string,
    index: number,
    id: string,
    isDragged?: boolean
}


const Column = ({ text, index, id, isDragged }: ColumnProp) => {
    const { state, dispatch } = useAppState()

    return (
        <>
            <ColumnContainer $isDragged={isDragged}>
                <ColumnTitle>
                    {text}
                    <DeleteButton onClick={() => dispatch({ type: "DELETE_COLUMN", payload: { columnId: id } })} > X</DeleteButton>
                </ColumnTitle>

                <StrictModeDroppable droppableId={id} type="card" >
                    {
                        (provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {state.lists[index].tasks.map((task, index) => (
                                    <Card text={task.text} id={task.id} index={index} key={task.id} columnId={id} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )
                    }
                    {/* {state.lists[index].tasks.map((task, index) => (
                        <Card text={task.text} id={task.id} index={index} />
                    ))} */}
                </StrictModeDroppable>
                <AddNewItem
                    toggleButtonText="+ Add new task"
                    //! taskId here is Column's id
                    onAdd={text => dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })}
                    dark
                />
            </ColumnContainer>
        </>
    )
}

export default Column