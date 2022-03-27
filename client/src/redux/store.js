import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import transactionReducer from './transaction/reducer';

const store = createStore(transactionReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;