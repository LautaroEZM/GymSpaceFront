import React from 'react'
import { Message, } from "@chatscope/chat-ui-kit-react";
import Linkify from 'react-linkify';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getMenuButtons, getMenuContext } from '../../../utils/chat/objects/menu';

export default function ChatMessage({ message }) {
    console.log(message);
    return <Message model={message}>
        {message.sender != "user" && <Message.CustomContent>
            {message.message}
            {message.displayMenu && <Box sx={{ display: 'flex', '& > *': { m: 1, }, }}>
                <ButtonGroup
                    // orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="text"
                >
                    {getMenuButtons()}
                </ButtonGroup>
            </Box>}
        </Message.CustomContent>}
    </Message>
}
