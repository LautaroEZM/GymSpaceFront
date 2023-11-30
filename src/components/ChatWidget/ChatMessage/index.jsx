import React from 'react'
import { Message, } from "@chatscope/chat-ui-kit-react";
import Linkify from 'react-linkify';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getMenuButtons, getMenuContext } from '../ChatMenu';
import Typography from '@mui/material/Typography';
import ChatMenu from '../ChatMenu';

export default function ChatMessage({ index, message, sendMessage, disabled, setDisabled }) {
    return <Message model={message}>
        {message.sender != "user" && (
            <Message.CustomContent>
                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a
                        href={decoratedHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={key}
                    >
                        {decoratedText}
                    </a>
                )}>
                    {message.message}
                </Linkify>
                <ChatMenu sendMessage={sendMessage} disabled={disabled} setDisabled={setDisabled} />
                {!index && <Typography
                    variant="h10"
                    style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                >
                    Powered by ChatGPT
                </Typography>}
            </Message.CustomContent>
        )}
    </Message>
}
