import React, { useState } from 'react'
import Button from '@mui/material/Button';


export default function ClassSupportContext({ sendMessage, typing }) {
    const [disabled, setDisabled] = useState(false);

    const handleClick = async () => {
        setDisabled(true); // Desactivar botón
        await sendMessage("Quiero elegir una clase")
        setDisabled(false)
        // setTimeout(() => { setDisabled(false); }, 2000); // Activar botón
    };
    return <Button
        key="class"
        style={{ textTransform: 'none' }}
        size="small"
        onClick={handleClick}
        disabled={disabled}
    >
        Elegir clase
    </Button>
}
