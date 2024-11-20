import styled from "styled-components";
import DeleteButton from "./DeleteButton";
const ColumnTitle = styled.div`
padding: 6px 16px 12px;
font-weight: bold;
display: flex;
justify-content: space-between;
align-items: center;

&:hover ${DeleteButton} {
    display: block;
  }
`

export default ColumnTitle;