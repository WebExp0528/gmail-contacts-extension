import { Dispatch } from 'react';
import axios from 'utils/axios';

export type ContactsAction = {
    type: ActionType;
    payload?: User;
};

export type ActionType = 'GET_CONTACTS_SUCCESS' | 'GET_CONTACTS_START' | 'GET_CONTACTS_FAILED';

export const getContacts =
    (dispatch: Dispatch<any>) =>
    (email: string): Promise<Contact[]> => {
        return new Promise((resolve) => {
            dispatch({
                type: 'GET_CONTACTS_START',
            });
            axios(email)
                .get(`contacts/list`)
                .then(({ data }: any) => {
                    dispatch({
                        type: 'GET_CONTACTS_SUCCESS',
                        payload: data,
                    });

                    resolve(data);
                })
                .catch((err) => {
                    dispatch({
                        type: 'GET_CONTACTS_FAILED',
                        payload: [],
                    });
                    resolve([]);
                });
        });
    };
