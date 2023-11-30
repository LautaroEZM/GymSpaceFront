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
    const [disabled, setDisabled] = useState(false);
    const handleSend = async (message) => {
        setDisabled(true);
        await sendMessage(message)
        setDisabled(false)
    }

    return <div style={{ position: "relative", height: "500px", width: "300px" }}>
        <MainContainer>
            <ChatContainer>
                <MessageList
                    scrollBehavior='smooth'
                    typingIndicator={typing ? <TypingIndicator content="GymBot is typing" /> : null}
                >
                    {messages.map((message, index) => <ChatMessage
                        key={index}
                        index={index}
                        message={message}
                        sendMessage={sendMessage}
                        disabled={disabled}
                        setDisabled={setDisabled}
                    />)}
                </MessageList>
                <MessageInput
                    attachButton={true}
                    attachDisabled={typing}
                    onAttachClick={clearChat}
                    placeholder="Type message here"
                    onSend={handleSend}
                    disabled={disabled}
                />
            </ChatContainer>
        </MainContainer>
    </div>
}

