import {combineReducers} from 'redux';
import getDevices from './getDevices';
import editDevice from './editDevice';
import saveDevice from './saveDevice';
import getHeaderProp from './getHeaderProp';




export default combineReducers ({
    getDevices,
    editDevice,
    saveDevice,
    getHeaderProp
});