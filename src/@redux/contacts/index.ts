import { ContactsAction } from './actions';
import initialState from './initialState';

export default (state = initialState, action: ContactsAction) => {
    switch (action.type) {
        case 'GET_CONTACTS_START': {
            return {
                ...state,
                isLoading: true,
                contacts: [],
            };
        }
        case 'GET_CONTACTS_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                contacts: action.payload,
            };
        }
        case 'GET_CONTACTS_FAILED': {
            return {
                ...state,
                isLoading: false,
                contacts: [],
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
