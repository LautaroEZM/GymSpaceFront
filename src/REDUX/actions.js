import axios from "axios";

export const GET_USER = 'GET_USER'

export const WARNING = 'WARNING'

export const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user,
    }
}

export const warning = (boolean) => {
    return {
        type: WARNING,
        payload: boolean,
    }
}