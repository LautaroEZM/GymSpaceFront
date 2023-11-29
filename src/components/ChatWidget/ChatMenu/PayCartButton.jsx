import React, { useState } from 'react'
import Button from '@mui/material/Button';
import createPaymentLink from '../../../utils/payments/createPayment';


export default function PayCartButton({ sendMessage, typing }) {
    const [disabled, setDisabled] = useState(false);

    const handleClick = async () => {
        setDisabled(true); // Desactivar botón
        const mpData = await createPaymentLink()
        const mpLink = mpData?.response.init_point
        if (mpLink) window.open(mpLink, 'MercadoPago');
        else console.log("Error del servidor para generar link de pago.");
        setDisabled(false)
    };
    return <Button
        key="cart"
        style={{ textTransform: 'none' }}
        size="small"
        onClick={handleClick}
        disabled={disabled}
    >
        Pagar carrito
    </Button>
}
