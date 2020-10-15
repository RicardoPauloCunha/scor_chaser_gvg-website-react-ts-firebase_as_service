import styled from 'styled-components';

export const GroupInfos = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`;

export const Infos = styled.div`
    &:first-child {
        margin: 1rem auto 2rem auto;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: 1024px) {
        width: 45%;
        margin: 1rem auto;
    }
`;

export const Table = styled.table`
    border-collapse: collapse;
    color: var(--color-black);
`;

export const HeaderTable = styled.th`
    padding: 1rem;
    background-color: var(--color-white-smoke);
    border: 1px solid var(--color-blue);
`;

export const CellTable = styled.th`
    padding: 1rem;
    background-color: var(--color-white-smoke);
    border: 1px solid var(--color-blue);
`;

export const Warn = styled.p`
    margin-top: 4rem;
    text-align: center;
`;
