/**
 * El sistema genera un nuevo link de pago cada vez surjan cambios en el carrito de compras.
 */
export default (data) => {
    const {
        shoppingCart,
        mpLink,
        linkCreated
    } = data

    return [
        generateGymBotContext(),
        generatePaymentLinkContext(),
        generateShoppingCartContext(shoppingCart),
        generateChatMenuContext(),
        generateClassSuportContext(),
    ].join(`\n\n`)
}

const generateGymBotContext = () => {
    return `Eres parte del stuff de GymSpace, empresa que vende productos y servicios fitness.
    Algunos productos que se venden son bebidas, pesas, suplementos, entre otros.
    Tu misión es atender las consultas de los usuarios en su página web, donde estos podrán ver, añadir al carrito y comprar tanto servicios como productos ofrecidos por GymSpace.
    Los usuarios querrán saber acerca de la empresa y su compra. Por tanto sé cortez y facilita información pertinente.`
}

const generatePaymentLinkContext = () => {
    return `Con respecto al link de pago. Eres capaz de mostrar el botón de pago "Pagar carrito". El cliente deberá hacer click al botón para generar el pedido.`
}

const generateShoppingCartContext = (shoppingCart) => {
    let context = `El sistema de GymSpace guardan los datos del carrito de compras del cliente. Por tanto podrás visualizar el estado del carrito en todo momento.`
    context += shoppingCart ?
        `\nEl carrito de compras del cliente es el siguiente: ${JSON.stringify(shoppingCart)}` :
        `\nAhora mismo el carrito está vacío. El cliente deberá llenarlo agregando productos y servicios de GymSpace.`
    return context
}

const generateSelectClassContext = () => { }
const generateChatMenuContext = () => {
    return `
    Eres capaz de generar el menu de opciones.
    El menu de opciones es un menu que contiene los botones de "Elegir clase", "Ver mi carrito" y "Pagar carrito". Este menu sirve como atajo a funcionalidades de GymSpace.
    Las clases ofrecidas son:
    1. Servicio de musculación: Para usuario que quieren aumentar su masa muscular a través de ejecicios de musculación y de máquinas.
    2. Servicio Crossfit: Para usuario que quieren ejercitar de manera holística, tanto peso como cardio.
    `

}

const generateClassSuportContext = () => {
    return `
    Serás capaz de ayudar a los usuarios a elegir una clase adecuada de Gymspace. Podrás ofrecer rutinas de entrenamiento, dietas, recomendaciones, entre otros. Siempre deberás recomendar un servicio/clase ofrecidos por Gymspace. Deberás enviar el link de acceso ráodio al servicio/clase ofrecidos por Gymspace al usuario.
    `
}

// const buttons = [
//     {
//         button: <Button
//             key="class"
//             style={{ textTransform: 'none' }}
//             size="small"
//         >
//             Elegir clase
//         </Button>,
//         title: "Elegir clase",
//         description: "Elegir esta opción si necesitas ayuda para elegir una clase de GymSpace.",
//     },
//     {
//         button: <CartReviewButton />,
//         title: "Ver mi carrito",
//         description: "Elegir esta opción si deseas ver los items de tu carrito",
//     },
//     {
//         button: <Button
//             key="link"
//             style={{ textTransform: 'none' }}
//             size="small"
//         >
//             Pagar carrito
//         </Button>,
//         title: "Pagar carrito",
//         description: "Elegir esta opción se deseas ir a la pasarela de pagos y pagar tu carrito",
//     },
// ];

// export const getMenuContext = () => {
//     let context = `\nOpciones disponibles:`
//     for (let i = 0; i < buttons.length; i++) {
//         const button = buttons[i]
//         context += `\n${(i + 1)}. ${button.title}: ${button.description}.`
//     }
//     return context
// }

// export const getMenuButtons = () => buttons.map(btn => btn.button)
