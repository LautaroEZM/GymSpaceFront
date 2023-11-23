import axios from "axios";

export const GET_USER = 'GET_USER'

export const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user,
    }
}