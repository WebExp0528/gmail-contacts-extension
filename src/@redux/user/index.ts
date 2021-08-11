import { UserAction } from './actions';
import initialState from './initialState';

export default (state = initialState, action: UserAction) => {
    let nextState: User = {};
    switch (action.type) {
        case 'SET_USER':
            nextState = {
                ...state,
                ...action?.payload,
            };
            break;
    }
    return nextState;
};
