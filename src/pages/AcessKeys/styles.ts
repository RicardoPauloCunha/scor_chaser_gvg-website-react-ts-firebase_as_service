import styled from 'styled-components';

export const Key = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const BlockKey = styled.div`
    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
        width: 100%auto;
    }
`;

export const KeyText = styled.span`
    background-color: var(--color-white-smoke);
    padding: 0.5rem 0.9rem;
    border-radius: 30px;
    margin: 0.7rem 0 0 0;
    color: var(--color-black);
`;