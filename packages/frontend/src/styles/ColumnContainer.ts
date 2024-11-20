import styled from "styled-components"

interface ColumnContainerProps {
    $isDragged?: boolean;

}


const ColumnContainer = styled.div<ColumnContainerProps>`
background-color: #ebecf0;
width: 300px;
min-height: 40px;
margin-right: 20px;
transform: ${props => props.$isDragged ? 'rotate(4deg)' : undefined};
transition: transform 0.15s ease-in-out;
border-radius: 3px;
padding: 8px 8px;
flex-grow: 0;
`

export default ColumnContainer;