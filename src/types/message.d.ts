declare type EXTMessageType = 'SIGN_IN' | 'SIGN_UP' | 'ACTIVE_PAGE_ACTION' | 'CHECK_AUTH' | 'GET_USER';

declare type EXTMessage<T = any> = {
    type: EXTMessageType;
    data?: T;
};
