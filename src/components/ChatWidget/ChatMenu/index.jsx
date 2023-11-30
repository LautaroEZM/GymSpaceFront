import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import createPaymentLink from '../../../utils/payments/createPayment';

export default function ChatMenu({ sendMessage, disabled, setDisabled }) {
    const buttonsData = [
        {
            textValue: "Elegir clase",
            handleClick: async () => {
                setDisabled(true);
                await sendMessage("Quiero elegir una clase")
                setDisabled(false)
            },
        },
        {
            textValue: "Ver mi carrito",
            handleClick: async () => {
                setDisabled(true);
                await sendMessage("Muestrame mi carrito")
                setDisabled(false)
            },
        },
        // {
        //     textValue: "Pagar carrito",
        //     handleClick: async () => {
        //         setDisabled(true);
        //         const mpData = await createPaymentLink()
        //         const mpLink = mpData?.response.init_point
        //         if (mpLink) window.open(mpLink, 'MercadoPago');
        //         else console.log("Error del servidor para generar link de pago.");
        //         setDisabled(false)
        //     },
        // },
    ]
    return <Box sx={{ display: 'flex', '& > *': { m: 1, }, }}>
        <ButtonGroup
            orientation="horizontal"
            aria-label="vertical contained button group"
            variant="contained"
            size='small'
            color='inherit'
            disabled={disabled}
        >
            {buttonsData.map((btn, index) => <Button
                key={index}
                textValue={btn.textValue}
                size="small"
                style={{ textTransform: 'none' }}
                onClick={btn.handleClick}
            >
                {btn.textValue}
            </Button>)}
        </ButtonGroup>
    </Box>
}





