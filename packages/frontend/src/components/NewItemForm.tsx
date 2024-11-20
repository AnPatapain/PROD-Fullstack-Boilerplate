import { useState } from "react";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "../styles";
import { useFocus } from "@frontend/hooks";


interface NewItemFormProps {
    onAdd(text: string): void
}

const NewItemForm = (props: NewItemFormProps) => {
    const [text, setText] = useState("")
    const inputRef = useFocus()
    const { onAdd } = props
    return (
        <NewItemFormContainer>
            <NewItemInput
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <NewItemButton onClick={() => onAdd(text)}>
                Create
            </NewItemButton>
        </NewItemFormContainer>
    )
}

export default NewItemForm