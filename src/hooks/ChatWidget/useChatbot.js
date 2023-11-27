import { useState, useEffect } from 'react';
import axios from 'axios';

const useChatbot = (initialMessage) => {
    const CHATBOT_NAME = "assistant";

    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: initialMessage,
            sender: CHATBOT_NAME,
        },
    ]);

    const sendMessage = async (userMessage) => {
        const newMessage = {
            message: userMessage,
            sender: "user",
            direction: "outgoing",
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setTyping(true);

        try {
            const apiData = await getResponse(newMessages);
            const botResponse = {
                message: apiData.choices[0].message.content,
                sender: CHATBOT_NAME,
            };

            setMessages((prevMessages) => [...prevMessages, botResponse]);
        } catch (error) {
            console.log(error);
        } finally {
            setTyping(false);
        }
    };

    const getResponse = async (chatMessages) => {
        const apiMessages = chatMessages.map((messageObject) => {
            return {
                role: messageObject.sender === CHATBOT_NAME ? "assistant" : "user",
                content: messageObject.message,
            };
        });

        const options = {
            method: 'POST',
            url: "http://localhost:3001/chat/response",
            data: { "messages": apiMessages },
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    };

    return { messages, typing, sendMessage };
};

export default useChatbot;
