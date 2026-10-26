import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store.js';
import { LanguageProvider } from './LanguageContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
      <Provider store={store}>
      <BrowserRouter>
      <LanguageProvider>
         <App />
      </LanguageProvider>
      </BrowserRouter>
      </Provider>
);


