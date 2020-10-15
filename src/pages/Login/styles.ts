import styled from 'styled-components';

export const MainLogin = styled.div`
    width: 90%;
    margin: 5rem auto 0 auto;
    background-color: var(--color-strong-gray);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 7%;
    text-align: center;
    @media (min-width: 768px) {
        width: 60%;
        padding: 5%;
    }
    @media (min-width: 1024px) {
        width: 40%;
        padding: 3%;
    }
`;