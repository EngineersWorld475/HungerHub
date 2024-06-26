import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store, hungPersistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={hungPersistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
