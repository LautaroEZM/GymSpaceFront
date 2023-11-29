import React, { useState } from 'react'
import Button from '@mui/material/Button';


export default function CartReviewButton({ sendMessage, typing }) {
    const [disabled, setDisabled] = useState(false);

    const handleClick = async () => {
        setDisabled(true); // Desactivar botón
        await sendMessage("Quiero ver mi carrito")
        setDisabled(false)
        // setTimeout(() => { setDisabled(false); }, 2000); // Activar botón
    };
    return <Button
        key="cart"
        style={{ textTransform: 'none' }}
        size="small"
        onClick={handleClick}
        disabled={disabled}
    >
        Ver mi carrito
    </Button>
}
