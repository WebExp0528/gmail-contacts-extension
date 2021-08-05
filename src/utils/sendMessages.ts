import { browser, Runtime, Tabs } from 'webextension-polyfill-ts';

/**
 * Send Message to Background Script
 *
 * @param msg
 * @returns
 */
export const sendMessage = (msg: EXTMessage, options?: Runtime.SendMessageOptionsType): Promise<EXTResponse> => {
    return browser.runtime.sendMessage(msg, options);
};

/**
 * Send Message to Content Script
 */
export const sendMessageWithTab = (
    tab: Tabs.Tab,
    msg: EXTMessage,
    options?: Tabs.SendMessageOptionsType
): Promise<Response> => {
    return browser.tabs.sendMessage(tab.id as number, msg, options);
};
