import { createGlobalStyle } from 'styled-components';
 

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #F9F6EE;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.70s linear;
  }
`;
// 
export default GlobalStyle;