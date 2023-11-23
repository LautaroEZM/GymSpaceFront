import {GET_USER} from './actions'

const initState = {
    user: {}
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