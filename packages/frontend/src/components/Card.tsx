
import { Draggable } from "react-beautiful-dnd";
import { CardContainer, DeleteButton } from "../styles";
import { useAppState } from "../hooks";

interface CardProp {
    text: string
    id: string
    index: number
    columnId: string
}


const Card = ({ text, id, index, columnId }: CardProp) => {
    const { state, dispatch } = useAppState()
    return (
        <Draggable key={id} draggableId={id} index={index}>
            {
                (provided, snapshot) => (
                    <CardContainer $isDragged={snapshot.isDragging}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {text}
                        <DeleteButton onClick={() => dispatch({ type: "DELETE_TASK", payload: { taskId: id, columnId } })} > X</DeleteButton>
                    </CardContainer>
                )
            }
        </Draggable >
    )
}


export default Card