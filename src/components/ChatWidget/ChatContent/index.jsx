import React, { useState } from 'react'
import Linkify from 'react-linkify';
import Button from '@mui/material/Button';
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
    const { messages, typing, sendMessage } = useChatbot(initialMessage)

    const handleLinkClick = () => createPaymentLink();
    return <div style={{ position: "relative", height: "500px", width: "300px" }}>
        <MainContainer>
            <ChatContainer>
                <MessageList
                    scrollBehavior='smooth'
                    typingIndicator={typing ? <TypingIndicator content="GymBot is typing" /> : null}
                >
                    {messages.map((message, index) => <ChatMessage key={index} message={message} />)}
                </MessageList>
                <MessageInput placeholder="Type message here" onSend={sendMessage} />
            </ChatContainer>
        </MainContainer>
    </div>
}
