import styled, {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
    :root {
        --color-black: #323232;
        --color-strong-gray: #5E5E5E;
        --color-text: #EFEFEF;
        --color-white-smoke: #E5E5E5;
        --color-blue: #767AEF;
        --color-blue-secondary: #4E52C3; 
        --color-red: #EF7676;

        font-size: 60%;
        color: var(--color-text);
        font: 400 1rem Roboto;
    }

    * {
        margin: 0;
        padding: 0;     
        box-sizing: border-box;
    }

    body {
        background: var(--color-black);
        width: 100%;
    }

    h1 {
        text-align: center;
        margin-bottom: 1rem;
    }

    h2 {
        text-align: center;
        margin-bottom: 0.7rem;
    }

    a {
        text-decoration: none;
    }

    input {
        background-color: var(--color-white-smoke);
        width: 100%;
        padding: 0.5rem 0.9rem;
        border-radius: 30px;
        margin: 0.7rem 0 1rem 0;
        border: none;
        outline: 0;
        border: solid 2px var(--color-white-smoke);
    }

    input:focus {
        border: solid 2px var(--color-blue);
    }

    select {
        color: var(--color-black);
        background-color: var(--color-white-smoke);
        width: 100%;
        padding: 0.5rem 0.9rem;
        border-radius: 30px;
        margin: 0.7rem 0 1rem 0;
        border: none;
        outline: 0;
        border: solid 2px var(--color-white-smoke);
    }
`

export const Logo = styled.h1`
    font-size: 2rem;
    text-transform: uppercase;
`;

export const Bar = styled.div`
    width: 100%;
    height: 2px;
    background-color: var(--color-white-smoke);
    margin: 1rem 0;
`;

export const ListPlayers = styled.div`
    overflow-y: scroll;
    max-height: 220px;
    margin: 1rem 0 0 0;
    padding-right: 0.5rem;
    @media (min-width: 768px) {
        width: 70%;
        margin: 1rem auto;
        text-align: center;
    }
`;

export const MessageListPlayer = styled.div`
    color: var(--color-black);
    background-color: var(--color-white-smoke);
    width: 100%;
    padding: 1rem;
    border-radius: 10px;
`;

export const Main = styled.div`
    width: 90%;
    margin: 2rem auto;
    background-color: var(--color-strong-gray);
    padding: 7%;
    @media (min-width: 768px) {
        width: 75%;
        padding: 5%;
    }
    @media (min-width: 1024px) {
        width: 60%;
        padding: 3%;
    }
`;

export const MessageLink = styled.span`
    color: var(--color-blue);
    margin-top: 0.5rem;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
        color: var(--color-blue);
    }
`;