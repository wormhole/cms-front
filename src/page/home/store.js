import {combineReducers, createStore} from 'redux';
import homeReducer from "./reducer";

const rootReducer = combineReducers({
    home: homeReducer
});

const store = createStore(rootReducer);
export default store;