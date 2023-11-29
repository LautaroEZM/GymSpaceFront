import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const buttons = [
    {
        button: <Button
            key="class"
            style={{ textTransform: 'none' }}
            size="small"
        >
            Elegir clase
        </Button>,
        title: "Elegir clase",
        description: "Elegir esta opción si necesitas ayuda para elegir una clase de GymSpace.",
    },
    {
        button: <Button
            key="cart"
            style={{ textTransform: 'none' }}
            size="small"
            onClick={() => console.log("Hello")}
        >
            Ver mi carrito
        </Button>,
        title: "Ver mi carrito",
        description: "Elegir esta opción si deseas ver los items de tu carrito",
    },
    {
        button: <Button
            key="link"
            style={{ textTransform: 'none' }}
            size="small"
        >
            Pagar carrito
        </Button>,
        title: "Pagar carrito",
        description: "Elegir esta opción se deseas ir a la pasarela de pagos y pagar tu carrito",
    },
];

export const getMenuContext = () => {
    let context = `\nOpciones disponibles:`
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]
        context += `\n${(i + 1)}. ${button.title}: ${button.description}.`
    }
    return context
}


export const getMenuButtons = () => buttons.map(btn => btn.button)