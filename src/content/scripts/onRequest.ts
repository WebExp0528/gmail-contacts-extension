import { Runtime } from 'webextension-polyfill-ts';

export const onRequest = async (msg: EXTMessage, sender: Runtime.SendMessageOptionsType): Promise<EXTResponse> => {
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
