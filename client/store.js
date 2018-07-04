import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const store = createStore(
  reducer,
  composeWithDevTools(),
  applyMiddleware(logger, thunk),
);

export default store;
