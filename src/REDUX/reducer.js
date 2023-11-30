import {GET_USER, WARNING} from './actions'

const initState = {
    user: {},
    warning: true,
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case GET_USER: return {
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