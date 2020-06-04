import { SAVE_DEVICE } from '../types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_DEVICE: 
	    return action.payload;
	
	    default:
	    return state;
    }
}