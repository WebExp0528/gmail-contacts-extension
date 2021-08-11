import { combineReducers } from 'redux';
import { AppState } from './index';

import user from './user';
import contacts from './contacts';
import authenticated from './authenticated';

const createAppReducer = (initialState: AppState) => {
    const appReducer = combineReducers({ user, authenticated, contacts });

    return (state = initialState, action: any) => {
        const nextState = appReducer(state, action);
        return nextState;
    };
};

export default createAppReducer;
