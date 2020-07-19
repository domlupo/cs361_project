import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';

import './theme/theme.css';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './redux/configureStore';

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector('#root'),
);
