import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { InputBlock } from './styles';
import MessageInput from '../MessageInput';

interface Props {
    label: string;
    name: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <InputBlock>
            <label htmlFor={name}>{label}</label>
            {error && <MessageInput messageText={error} />}
            <input
                className="input"
                id={name}
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest} />
        </InputBlock>
    )
}

export default Input;