import { GET_HEADER_PROP } from '../types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_HEADER_PROP: 
	    return action.payload;
	
	    default:
	    return state;
    }
}