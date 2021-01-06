import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import authReducer from './store/reducers/auth'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';



  const composeEnhancers = process.env.NODE_ENV === "development" ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    null || compose;
  
  const store = createStore(authReducer,composeEnhancers(
    applyMiddleware(thunk)
  )) 


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
