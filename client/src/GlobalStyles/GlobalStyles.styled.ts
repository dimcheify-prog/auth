import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body, :before, :after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }  
  
  html {
    font-size: 62.5%;
    font-family: 'Inter', sans-serif;
  }
`;