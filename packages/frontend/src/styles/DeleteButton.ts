import styled from 'styled-components'


const DeleteButton = styled.button`
    right: 10px;
  top: 10px;
  display: none;
  cursor: pointer;
  border: none;
  background-color: transparent;
  &:hover {
    outline: 2px solid red;
    border-radius: 40%;
  }
`

export default DeleteButton