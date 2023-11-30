import axios from "axios";

export const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER'
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

export const setUser = (user) => {
    console.log("console log de user ======", user)
    return {
        type: SET_USER,
        payload: user,
    }
}