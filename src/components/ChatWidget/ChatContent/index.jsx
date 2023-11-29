import React, { useState } from 'react'
import Linkify from 'react-linkify';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import useChatbot from '../../../hooks/ChatWidget/useChatbot';
import createPaymentLink from '../../../utils/payments/createPayment';
import ChatMessage from '../ChatMessage';

export default function ChatContent() {
    const initialMessage = `Hola, soy GymBot. ¿Cómo puedo ayudarte?`
    const { messages, typing, sendMessage, clearChat } = useChatbot(initialMessage)

    return <div style={{ position: "relative", height: "500px", width: "300px" }}>
        <MainContainer>
            <ChatContainer>
                <MessageList
                    scrollBehavior='smooth'
                    typingIndicator={typing ? <TypingIndicator content="GymBot is typing" /> : null}
                >
                    {messages.map((message, index) => <ChatMessage
                        key={index}
                        message={message}
                        sendMessage={sendMessage}
                        typing={typing}
                    />)}
                </MessageList>
                <Box sx={{ flexGrow: 1 }} as="MessageInput">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={1}>
                            <IconButton
                                aria-label="delete"
                                onClick={clearChat}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                            <MessageInput
                                attachButton={false}
                                placeholder="Type message here"
                                onSend={sendMessage}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </ChatContainer>
        </MainContainer>
    </div>
}

