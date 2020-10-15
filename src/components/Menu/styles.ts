import styled from 'styled-components';

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const MenuElement = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const MenuIcons = styled.div`
    font-size: 1.5rem;
    @media (min-width: 768px) {
        display: none;
    }
`;

export const Links = styled.nav`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        align-items: center;
        flex-direction: row;
    }
`;

export const MessageMenuLink = styled.span`
    color: var(--color-text);
    margin-top: 0.5rem;
    margin: 1rem;
    &:hover {
        text-decoration: underline;
        color: var(--color-text);
    }
    @media (min-width: 768px) {
        margin: 0 1rem;
    }
`;