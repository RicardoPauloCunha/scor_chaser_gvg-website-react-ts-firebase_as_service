import styled from 'styled-components';

export const ButtonBlock = styled.div`
    text-align: center;
`;

export const ButtonElement = styled.button`
    background-color: var(--color-blue);
    border: none;
    border-radius: 30px;
    margin: 0.9rem 1rem;
    border: none;
    text-align: center;
    padding: 0.7rem 3rem;
    transition: 0.3s;
    outline: none;
    cursor: pointer;
    &:active {
        background-color: var(--color-blue-secondary);
    }
    &:hover {
        opacity: 0.7;
    };
`;
