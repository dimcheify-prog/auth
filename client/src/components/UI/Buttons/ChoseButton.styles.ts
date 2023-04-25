import styled from "styled-components";

export const ChoseButton = styled.button`
  //background: #9ec9bd;
  color: #000;
  padding: .5rem 2.5rem;
  text-align: center;
  font-weight: 500;
  font-size: 2rem;
  border: none;
  //border-bottom: 1px solid blue;
  cursor: pointer;
`;

export const ChoseButtonWithBorder = styled(ChoseButton)`
  border-bottom: 1px solid blue;  
`;