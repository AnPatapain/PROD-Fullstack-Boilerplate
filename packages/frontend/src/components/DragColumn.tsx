
import { Draggable } from "react-beautiful-dnd";


import Column from "./Column";


interface DragColumnProp {
    text: string,
    index: number,
    id: string,

}

const DragColumn = ({ text, index, id }: DragColumnProp) => {
    return (

        <Draggable key={id} draggableId={id} index={index}>
            {
                (provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Column text={text} index={index} id={id} isDragged={snapshot.isDragging} />
                    </div>
                )
            }
        </Draggable>

    )
}

export default DragColumn