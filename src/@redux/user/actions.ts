import { Dispatch } from 'react';
import axios from 'utils/axios';
import _ from 'lodash';

export type UserAction = {
    type: ActionType;
    payload?: User;
};

export type ActionType = 'SET_USER' | 'SET_AUTHENTICATED';

export const getUser =
    (dispatch: Dispatch<any>) =>
    (email: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            axios(email)
                .get(`users/info`)
                .then(({ data }: any) => {
                    dispatch({
                        type: 'SET_USER',
                        payload: data,
                    });
                    dispatch({
                        type: 'SET_AUTHENTICATED',
                        payload: true,
                    });
                    resolve(true);
                })
                .catch((err) => {
                    dispatch({
                        type: 'SET_AUTHENTICATED',
                        payload: false,
                    });
                    resolve(false);
                });
        });
    };
