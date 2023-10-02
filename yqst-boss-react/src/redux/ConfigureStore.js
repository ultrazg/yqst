/**
 * Created by ljy on 2017/3/27.
 */
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import ReducerIndex from './ReducerIndex';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function ConfigureStore(initialState) {
    const store = createStoreWithMiddleware(ReducerIndex, initialState);
    return store;
}