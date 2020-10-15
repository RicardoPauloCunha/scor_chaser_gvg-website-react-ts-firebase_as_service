import React from 'react';

import { MessageText } from './styles';

interface MessageInputProps {
    messageText: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ messageText }) => {
    return (
        <MessageText>{messageText}</MessageText>
    )
}

export default MessageInput;