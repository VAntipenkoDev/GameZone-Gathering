import { createGlobalStyle } from 'styled-components';
import './index.css';

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    * {
        font-weight: 400;
    }

    body {
        overflow: hidden;
        padding: 0;
        margin: 0;
    }
`;
