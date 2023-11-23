import {GET_USER} from './actions'

const initState = {
    user: null
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case GET_USER: return {
            ...state,
            user: action.payload
        }
        default: return state
    }
}

export default reducer