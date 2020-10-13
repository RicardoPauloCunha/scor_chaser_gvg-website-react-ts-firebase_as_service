import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const InputText = styled.input`
    background-color: var(--color-white-smoke);
    width: 100%;
    padding: 0.5rem 0.9rem;
    border-radius: 30px;
    margin: 0.7rem 0 1rem 0;
    border: none;
    outline: 0;
    border: solid 2px var(--color-white-smoke);
    &:focus {
        border: solid 2px var(--color-blue);
    }
`;

const InputBlock = styled.div`
    @media (min-width: 768px)
    {
        margin: 0 1rem;
    }
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
    return (
        <InputBlock>
            <label htmlFor={name}>{label}</label>
            <InputText name={name} {...rest} />
        </InputBlock>
    )
}

export default Input;