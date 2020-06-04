import React from 'react';
import ReactDOM from 'react-dom';
import Devices from './components/Devices';

import {Provider} from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <Devices />
  </Provider>,
  document.getElementById('root')
);
