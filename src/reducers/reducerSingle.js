import { FETCH_SINGLE, RESET_INITIAL_STATE } from '../actions/actionConstants'

//default our state to {object} to begin with
export default function (state = {}, action) {
    switch (action.type) {

        case FETCH_SINGLE:
            return { ...action.payload }

        case RESET_INITIAL_STATE:
            return { ...action.payload }

        default:
            return state;
    }
}