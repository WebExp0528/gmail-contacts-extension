import { Runtime } from 'webextension-polyfill-ts';
import { Message } from 'types/message';
import { Response } from 'types/response';

export const onRequest = async (msg: Message, sender: Runtime.SendMessageOptionsType): Promise<Response> => {
    try {
        switch (msg.type) {
            default:
                return { type: 'SUCCESS' };
        }
    } catch (error) {
        throw error;
    }
};

export default onRequest;
