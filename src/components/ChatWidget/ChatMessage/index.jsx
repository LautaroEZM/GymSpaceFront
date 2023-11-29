import React from 'react'
import { Message, } from "@chatscope/chat-ui-kit-react";
import Linkify from 'react-linkify';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getMenuButtons, getMenuContext } from '../ChatMenu';
import ChatMenu from '../ChatMenu';

export default function ChatMessage({ message, sendMessage, typing }) {
    // console.log(message);
    return <Message model={message}>
        {message.sender != "user" && <Message.CustomContent>
            {message.message}
            <ChatMenu sendMessage={sendMessage} typing={typing} />
        </Message.CustomContent>}
    </Message>
}
