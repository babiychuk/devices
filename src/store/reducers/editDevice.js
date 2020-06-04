import { EDIT_DEVICE } from '../types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case EDIT_DEVICE: 
	    return action.payload;
	
	    default:
	    return state;
    }
}