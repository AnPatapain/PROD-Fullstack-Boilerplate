import styled from "styled-components";
import DeleteButton from "./DeleteButton";

interface CardContainerProps {
  $isDragged?: boolean;

}

const CardContainer = styled.div<CardContainerProps>`
display: flex;
justify-content: space-between;
align-items: center;
background-color: #fff;
cursor: pointer;
margin-bottom: 0.5rem;
padding: 0.5rem 1rem;
max-width: 300px;
border-radius: 3px;

outline: ${props => props.$isDragged ? '2px solid #4CAF50' : 'none'}; 
&:hover {
    outline: 2px solid black;
  }
transition: background-color 0.2s ease;
box-shadow: #091e4240 0px 1px 0px 0px;

&:hover ${DeleteButton} {
  display: block;
}
`

export default CardContainer;