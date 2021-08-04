import { combineReducers } from 'redux';
import { AppState } from './index';
import { initialState } from './initialState';

const { ...emptyInitState } = initialState;

const createAppReducer = (initialState: AppState) => {
    const appReducer = combineReducers({});

    return (state = initialState, action: any) => {
        const nextState = appReducer(state, action);
        return nextState;
    };
};

export default createAppReducer;
