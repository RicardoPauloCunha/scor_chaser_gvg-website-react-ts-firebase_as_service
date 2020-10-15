import styled from 'styled-components';

export const Player = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: var(--color-white-smoke);
    border-radius: 10px;
    margin-bottom: 0.5rem;
    &:last-child {
        margin-bottom: 2rem;
    }
`;

export const PlayerInfos = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Point = styled.div`
    color: var(--color-black);
    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const Name = styled.span`
    color: var(--color-black);
    font-weight: 700;
`;

export const Button = styled.button`
    background-color: var(${props => props.color || '--color-blue'}) ;
    border: none;
    border-radius: 30px;
    margin: 0.7rem 0;
    border: none;
    text-align: center;
    padding: 0.5rem 1rem;
    transition: 0.5s;
    outline: none;
    font-size: 1rem;
    color: var(--color-white-smoke);
    margin: 0 0.3rem;
    cursor: pointer;
    &:active {
        background-color: var(--color-blue-secondary);
        opacity: 1;
    }
    &:hover {
        opacity: 0.7;
    };
`;