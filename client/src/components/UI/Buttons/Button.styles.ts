import styled from "styled-components";

export const Button = styled.button`
  border: none;
  padding: .5rem 3rem;
  font-size: 1.6rem;
  cursor: pointer;
  border-radius: 5px;
`;

export const ButtonWithBorder = styled(Button)`
  border-bottom: 1px solid blue;  
`;