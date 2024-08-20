import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.normal};
    font-weight: 400;
  }

  main {
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 20px;
  }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
