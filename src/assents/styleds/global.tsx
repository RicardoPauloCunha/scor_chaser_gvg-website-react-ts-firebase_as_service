import styled from 'styled-components';

export const Background = styled.div`
    width: 100%;
`;

export const Bar = styled.div`
    width: 100%;
    height: 2px;
    background-color: var(--color-white-smoke);
    margin: 1rem 0;
`;

export const TitlePage = styled.h1`
    text-align: center;
    margin-bottom: 1rem;
`;

export const SubtitlePage = styled.h2`
    text-align: center;
    margin-bottom: 0.7rem;
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

export const MainG = styled.div`
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

export const Logo = styled.h1`
    font-size: 2rem;
    text-transform: uppercase;
`;


export const Message = styled.div`
    color: var(--color-black);
    background-color: var(--color-white-smoke);
    width: 100%;
    padding: 1rem;
    border-radius: 10px;
`;