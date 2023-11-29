import axios from "axios";

const getGPTResponse = async (data) => {

    const options = {
        method: 'POST',
        url: "https://gymspace-backend.onrender.com/chat/response",
        data
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export default getGPTResponse;