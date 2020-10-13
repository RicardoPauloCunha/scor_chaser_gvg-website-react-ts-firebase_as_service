import React from 'react';
import styled from 'styled-components';

const MessageBlock = styled.div`
    text-align: center;
    padding: 1rem;
    color: var(--color-red);
`;

interface MessageProps {
    message: string;
}

const Input: React.FC<MessageProps> = ({ message }) => {
    return (
        <MessageBlock>
            <p>{message}</p>
        </MessageBlock>
    )
}

export default Input;