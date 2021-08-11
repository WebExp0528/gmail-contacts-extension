declare type EXTMessageType = 'GET_CONTACTS' | 'ACTIVE_PAGE_ACTION' | 'CHECK_AUTH' | 'GET_USER';

declare type EXTMessage<T = any> = {
    type: EXTMessageType;
    data?: T;
};
