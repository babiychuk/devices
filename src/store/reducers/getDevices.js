import { GET_DEVICES } from '../types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DEVICES: 
	    return action.payload;
	
	    default:
	    return state;
    }
}