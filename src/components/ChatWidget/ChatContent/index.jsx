import React, { useState } from 'react'
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

export default function ChatContent() {
    const { messages, typing, sendMessage } = useChatbot("Hello, How can I help you today?")

    return (
        <div style={{ position: "relative", height: "500px", width: "300px" }}>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        scrollBehavior='smooth'
                        typingIndicator={typing ? <TypingIndicator content="GymBot is typing" /> : null}
                    >
                        {messages.map((message, index) => {
                            return <Message key={index} model={message} />
                        })}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={sendMessage} />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}
