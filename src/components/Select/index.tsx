import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import {SelectBlock} from './styles';
import MessageInput from '../MessageInput';

interface Props {
    label: string;
    name: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

type SelectProps = JSX.IntrinsicElements['select'] & Props;

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <SelectBlock>
            <label htmlFor={name}>{label}</label>
            {error && <MessageInput messageText={error} />}
            <select
                className="input"
                id={name}
                ref={selectRef}
                defaultValue={defaultValue}
                {...rest}
            >
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
            </select>
        </SelectBlock >
    )
}

export default Select;