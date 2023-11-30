import React, { useEffect, useState } from 'react';
import { Fab, Popover } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import usePopover from '../../hooks/ChatWidget/usePopover';
import ChatContent from './ChatContent'
import generateGymBotContext, { fetchProducts, fetchServices } from '../../utils/chat/contextGenerators/generateGymBotContext';

const ChatWidget = () => {
    const { anchorEl, openPopover, closePopover } = usePopover()
    const open = Boolean(anchorEl);
    const id = open ? 'chat-popover' : undefined;
    const initialMessage = `Hola, soy GymBot. ¿Cómo puedo ayudarte?`
    const [chatbotContext, setChatbotContext] = useState("");

    const fetchData = async () => {
        try {
            const [fetchedProducts, fetchedServices] = await Promise.all([
                fetchProducts(),
                fetchServices()
            ]);
            return { products: fetchedProducts, services: fetchedServices };
        } catch (error) {
            console.error("Error fetching data: ", error);
            return { products: [], services: [] };
        }
    };

    useEffect(() => {
        fetchData().then(({ products, services }) => {
            setChatbotContext(generateGymBotContext({ products, services }))
        });
    }, []);

    const fabStyle = {
        position: 'fixed',
        top: '98%',
        left: '98%',
        backgroundColor: "orange",
        zIndex: 1,
        transform: 'translate(-100%, -100%)',
    };
    const iconStyle = {
        color: 'black',
    };
    return (
        <>
            <Fab
                color="primary"
                style={fabStyle}
                aria-describedby={id}
                onClick={openPopover}
                aria-label="chat"
            >
                <ChatIcon style={iconStyle} />
            </Fab>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <ChatContent
                    initialMessage={initialMessage}
                    chatbotContext={chatbotContext}
                />
            </Popover>
        </>
    );
};

export default ChatWidget;