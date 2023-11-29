import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import React from 'react'
import CartReviewButton from './CartReviewButton';
import ClassSupportButton from './ClassSupportButton';
import PayCartButton from './PayCartButton';

export default function ChatMenu({ sendMessage, typing }) {
    return <Box sx={{ display: 'flex', '& > *': { m: 1, }, }}>
        <ButtonGroup
            // orientation="vertical"
            aria-label="vertical contained button group"
            variant="text"
        >
            <ClassSupportButton sendMessage={sendMessage} />
            <CartReviewButton sendMessage={sendMessage} />
            <PayCartButton sendMessage={sendMessage} />
        </ButtonGroup>
    </Box>
}





