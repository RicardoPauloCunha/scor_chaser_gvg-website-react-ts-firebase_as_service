import React, { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

export const SelectBlock = styled.div`
    @media (min-width: 768px)
    {
        margin: 0 1rem;
        min-width: 40%;
    }
`;

const SelectItem = styled.select`
    background-color: var(--color-white-smoke);
    color: var(--color-black);
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

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Input: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
    return (
        <SelectBlock>
            <label htmlFor={name}>{label}</label>
            <SelectItem id={name} {...rest}>
                <option
                    key=""
                    value=""
                    disabled
                >Selecione</option>
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >{option.label}</option>
                ))}
            </SelectItem>
        </SelectBlock>
    )
}

export default Input;