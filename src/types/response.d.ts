export type ResponseType = 'SUCCESS' | 'FAILED' | 'PENDING' | 'UNAUTHORIZED' | 'AUTHENTICATED';

export type Response<T = any> = {
    type: ResponseType;
    data?: T;
};
