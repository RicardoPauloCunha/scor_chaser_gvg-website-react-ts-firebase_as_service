import React from 'react';
import styled from 'styled-components';

const ButtonBox = styled.div`
    text-align: center;
`;

const ButtonStyle = styled.button`
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

interface ButtonProps {
    onClick?(): void;
    type?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type }) => {
    return (
        <ButtonBox>
            <ButtonStyle type={type === 'button' ? 'button' : 'submit'} onClick={onClick}>{children}</ButtonStyle>
        </ButtonBox>
    )
}

export default Button;