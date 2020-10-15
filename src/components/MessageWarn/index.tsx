import React from 'react';

import { MessageWarnBlock } from './styles';

interface MessageWarnProps {
    messageText: string;
}

const MessageWarn: React.FC<MessageWarnProps> = ({ messageText }) => {
    return (
        <MessageWarnBlock>
            <p>{messageText}</p>
        </MessageWarnBlock>
    )
}

export default MessageWarn;