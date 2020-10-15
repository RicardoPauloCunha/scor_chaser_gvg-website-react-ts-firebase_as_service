import styled from 'styled-components';

export const Player = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    background-color: var(--color-white-smoke);
    border-radius: 10px;
    margin-bottom: 0.5rem;
    &:last-child {
        margin-bottom: 2rem;
    }
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