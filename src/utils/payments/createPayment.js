import axios from "axios";
import shoppingCart from "../chat/shoppingCart";

const createPaymentLink = async () => {
    try {
        if (shoppingCart) {
            const shoppingCartData = {
                userId: shoppingCart.userId,
                items: shoppingCart.items,
            }
            const data = await postPaymentLink(shoppingCartData)
            return data;
        }
        else {
        }
    } catch (error) {
        return undefined
    }
}

const postPaymentLink = async (data) => {
    const options = {
        method: 'POST',
        url: "https://gymspace-backend.onrender.com/payments/create-order",
        // url: "http://localhost:3001/payments/create-order",
        data
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export default createPaymentLink;