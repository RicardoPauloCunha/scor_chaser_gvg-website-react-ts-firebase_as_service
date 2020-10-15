import React from 'react';

import { ButtonBlock, ButtonElement } from './styles';

interface ButtonProps {
    onClick?(): void;
    type?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type }) => {
    return (
        <ButtonBlock>
            <ButtonElement type={type === 'button' ? 'button' : 'submit'} onClick={onClick}>{children}</ButtonElement>
        </ButtonBlock>
    )
}

export default Button;