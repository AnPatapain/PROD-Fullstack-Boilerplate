import styled from "styled-components";

interface AddItemButtonProp {
    $dark?: boolean
}

const AddItemButton = styled.button<AddItemButtonProp>`
background-color: #ffffff3d;
border-radius: 3px;
border: none;
color: ${props => {
        return Boolean(props.$dark) ? "#000" : "#fff"
    }
    };
cursor: pointer;
max-width: 300px;
padding: 10px 12px;
text-align: left;
transition: background 85ms ease-in;
width: 100%;
&:hover {
background-color: #ffffff52;
}
`
export default AddItemButton