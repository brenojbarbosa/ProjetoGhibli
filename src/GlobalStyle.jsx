import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #f9f8fa;
    color: #343a40;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
  }
`;

export default GlobalStyle;
 