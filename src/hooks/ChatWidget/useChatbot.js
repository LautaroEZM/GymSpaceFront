import { useState, useEffect } from 'react';
import { useLocalStorage } from '../useLocalStorage';
import createPaymentLink from '../../utils/payments/createPayment';
import generateGymBotContext from '../../utils/chat/contextGenerators/generateGymBotContext';
import shoppingCart from '../../utils/chat/shoppingCart';
import getGPTResponse from '../../utils/chat/getGPTResponse';
import { getMenuMessage } from '../../components/ChatWidget/ChatMenu';

const useChatbot = (initialMessage) => {
    const CHATBOT_NAME = "GymBot";

    const [typing, setTyping] = useState(false);
    const [paymentLink, setPaymentLink] = useLocalStorage("mplink", null)
    const [messages, setMessages] = useLocalStorage("chat", [
        {
            message: initialMessage,
            sender: CHATBOT_NAME,
            // displayMenu: true,
        },
    ]);

    const sendMessage = async (userMessage) => {
        const userMessageObject = {
            message: userMessage,
            sender: "user",
            direction: "outgoing",
        };

        const newMessages = [...messages, userMessageObject];
        setMessages(newMessages);
        setTyping(true);

        try {

            const mpData = await createPaymentLink()
            // const mpLink = mpData?.response.init_point
            // console.log(mpLink);
            // setPaymentLink(mpLink)
            const apiMessages = newMessages.map((message) => {
                return {
                    role: message.sender === CHATBOT_NAME ? "assistant" : "user",
                    content: message.message,
                };
            });

            // Get GPT Message
            const systemMessage = {
                role: "system",
                content: generateGymBotContext({ shoppingCart })
                // content: generateGymBotContext({ linkCreated: true, shoppingCart })
            }
            const apiData = await getGPTResponse({
                model: "gpt-3.5-turbo-1106",
                messages: [systemMessage, ...apiMessages],
                max_tokens: 120,
                temperature: 0.2,
                n: 1
            });

            // Add bot message
            const botResponse = {
                message: apiData.choices[0].message.content,
                sender: CHATBOT_NAME,
                // displayMenu: containsKeyword(userMessage, ["menu", "link"])
            };
            setMessages([...newMessages, botResponse]);
        } catch (error) {
            console.log(error);
        } finally {
            setTyping(false);
        }
    };

    return { messages, typing, sendMessage };
};

function containsKeyword(message, keywords) {
    const lowerCaseMessage = message.toLowerCase();
    return keywords.some(keyword => lowerCaseMessage.includes(keyword.toLowerCase()));
}

export default useChatbot;