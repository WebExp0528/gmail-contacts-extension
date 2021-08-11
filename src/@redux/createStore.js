import { createStore, applyMiddleware } from 'redux';
import { alias } from 'webext-redux';
import createAppReducer from './rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { aliases } from './aliases';
import { initialState } from './initialState';
// @ts-ignore
/* eslint-disable */
export const createStoreInstance = (preloadedState = initialState) => {
    const appReducer = createAppReducer(preloadedState);
    console.log('~~~~~ preload', preloadedState, appReducer);
    const store = createStore(appReducer, preloadedState, applyMiddleware(alias(aliases), thunk, logger));

    return store;
};

export default createStoreInstance();
