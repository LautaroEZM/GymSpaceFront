import axios from "axios"

export default (data) => {
    const {
        products,
        services,
    } = data
    const isEmpty = (list) => !list || !list.length
    const contexts = [
        // General context
        `\nEres parte del stuff de GymSpace, empresa que vende productos y servicios fitness.
        Tu misión es atender a usuarios de GymSpace:
        - Ayuda a los clientes de GymSpace a elegir una clase de acuerdo a sus necesidades.
        - Complementa tus recomendaciones y sugerencias con los links de las clases de GymSpace.
        - Proporciona información útil a los usuarios sobre productos y servicios de GymSpace.
        - Brinda información sobre el carrito de compras del cliente.
        - Guía al usuario a encontrar recursos en la página web de GymSpace.
        - Evita hablar de temas no relacionados con GymSpace.
        `,
        // Contexto del carrito del cliente
        (() => {
            let context = `\n\n ** Información del carrito del cliente **`
            const serviceCart = JSON.parse(localStorage.service)
            const productCart = JSON.parse(localStorage.product)

            // Ver si hay items en el carrito
            if (isEmpty(serviceCart) && isEmpty(productCart)) {
                context += `\n* Información: El carrito de compras está vacío. El cliente deberá llenarlo agregando productos y servicios de GymSpace.`
                return context
            }

            // Crear contexto del carrito
            const host = window.location.host;
            const protocol = window.location.protocol;

            if (!isEmpty(serviceCart)) {
                context += `\n\nInformación: El carrito contiene ${serviceCart.length} servicio(s):`
                for (let i = 0; i < serviceCart.length; i++) {
                    const service = serviceCart[i];
                    context += `\n\n* Servicio #${(i + 1)}`
                    context += `\n- Nombre del servicio: ${service.name}.`
                    // context += `\n- Ubicación: ${service.areaID}`
                    // context += `\n- Capacidad máxima de cupos: ${service.capacity}.`
                    // context += `\n- Categoría: ${service.category}.`
                    // context += `\n- Identifiación del profesor: ${service.coachID}.`
                    context += `\n- Descripción del servicio: ${service.description}.`
                    // context += `\n- Duración de la clase: ${service.duration}.`
                    // context += `\n- Número de meses por comprar: ${service.quantity}.`
                    // context += `\n- Precio del servicio: ${service.price}.`
                    context += `\n- Url del servicio: ${protocol}//${host}/ServiceDetail/${service.serviceID}.`
                    // context += `\n- Fecha de inicio del servicio: ${service.startDate}.`
                    // context += `\n- Horario de inicio del servicio: ${service.startTime}.`
                }
            }

            if (!isEmpty(productCart)) {
                context += `\n\nInformación: El carrito contiene ${productCart.length} producto(s):`
                for (let i = 0; i < productCart.length; i++) {
                    const product = productCart[i];
                    context += `\n\n* Producto #${(i + 1)}`
                    // context += `\n- Marca: ${product.brand}.`
                    // context += `\n- Categoría: ${product.category}.`
                    context += `\n- Nombre del producto: ${product.name}.`
                    context += `\n- Descripción del producto: ${product.description}.`
                    // context += `\n- Precio del producto: ${product.price}.`
                    context += `\n- Url del producto: ${protocol}//${host}/Marketplace/detail/${product.productID}.`
                    // context += `\n- Cantidad a comprar: ${product.quantity}.`
                    context += product.stockNow < 10 ? `\n- Stock: Quedan menos de 10 unidades.` : ``
                }
            }
            return context
        })(),
        // Contexto sobre las clases ofrecidas por GymSpace
        (() => {
            let context = `\n\n ** Información sobre clases ofrecidas por GymSpace **`
            const host = window.location.host;
            const protocol = window.location.protocol;
            const urlContext = `\n\n* Para mayor información visitar el siguiente link ${protocol}//${host}/Services.`

            // Create context
            if (isEmpty(services)) return context + urlContext
            for (let i = 0; i < services.length; i++) {
                const service = services[i];
                context += `\n\n* Servicio #${(i + 1)}`
                context += `\n- Nombre del servicio: ${service.name}.`
                context += `\n- Ubicación: ${service.areaID}`
                context += `\n- Capacidad máxima de cupos: ${service.capacity}.`
                context += `\n- Categoría: ${service.category}.`
                context += `\n- Identifiación del profesor: ${service.coachID}.`
                context += `\n- Descripción del servicio: ${service.description}.`
                context += `\n- Duración de la clase: ${service.duration}.`
                context += `\n- Precio del servicio: ${service.price}.`
                context += `\n- Url del servicio: ${protocol}//${host}/ServiceDetail/${service.serviceID}.`
                context += `\n- Fecha de inicio del servicio: ${service.startDate}.`
                context += `\n- Horario de inicio del servicio: ${service.startTime}.`
            }
            return context + urlContext
        })(),
        // Contexto sobre los productos ofrecidos por GymSpace
        (() => {
            let context = `\n\n ** Información sobre los productos ofrecidos por GymSpace **`
            const host = window.location.host;
            const protocol = window.location.protocol;
            const urlContext = `\n\n* Para mayor información, visitar el siguiente link ${protocol}//${host}/Marketplace.`
            if (isEmpty(products)) return context + urlContext

            // Create context
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                context += `\n\n* Producto #${(i + 1)}`
                context += `\n- Marca: ${product.brand}.`
                context += `\n- Categoría: ${product.category}.`
                context += `\n- Nombre del producto: ${product.name}.`
                context += `\n- Descripción del producto: ${product.description}.`
                context += `\n- Precio del producto: ${product.price}.`
                context += `\n- Url del producto: ${protocol}//${host}/Marketplace/detail/${product.productID}.`
                context += product.stockNow < 10 ? `\n- Stock: Quedan menos de 10 unidades.` : ``
            }
            context += urlContext
            return context
        })(),
        //
    ]
    console.log(contexts);
    return contexts.join(`\n\n`)
}

export const fetchProducts = async () => {
    try {
        const url = "https://gymspace-backend.onrender.com/products"
        const { data } = await axios(url)
        return data
    } catch (error) {
        console.log(error);
        return null
    }
}
export const fetchServices = async () => {
    try {
        const url = "https://gymspace-backend.onrender.com/services"
        const { data } = await axios(url)
        return data
    } catch (error) {
        console.log(error);
        return null
    }
}

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
