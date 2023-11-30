import {GET_USER, WARNING, SET_USER} from './actions'

const initState = {
    user: { systemRole: "Guest" },
    blockAccess: false, 
    warning: true,
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case GET_USER: return {
            ...state,
            user: action.payload
        }
        case SET_USER: return {
            ...state,
            user: action.payload
        }
        case WARNING: return {
            ...state,
            warning: action.payload
        }
        default: return state
    }
}

export default reducer