import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from './src/modules/reducers'; 

// checking to see if it's on DEV mode
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__});

const enhancer = compose(
  applyMiddleware(
    thunk,
    loggerMiddleware,
  )
);

const store = createStore(rootReducer,enhancer);

export default store;