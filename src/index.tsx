import React from 'react';
import ReactDOM from 'react-dom';
import * as _ from 'lodash';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as toastrReducer } from 'react-redux-toastr';
import rootSaga from './saga';

import App from './App';
import AppReducer from './parts/reducers/app';

const reducer = combineReducers({
  app: AppReducer,
  toastr: toastrReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
