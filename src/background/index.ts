import { browser, Runtime, Tabs } from 'webextension-polyfill-ts';
import { wrapStore } from 'webext-redux';
import store from '@redux/createStore';
import { getUser } from '@redux/user/actions';
import { getContacts } from '@redux/contacts/actions';

wrapStore(store);

/**
 * Define Background script functions
 */
class Background {
    constructor() {
        this.init();
    }

    /**
     * Document Ready
     * @returns {void}
     */
    init = () => {
        console.log('[=====Loaded Background Scripts=====]');

        //When extension installed
        browser.runtime.onInstalled.addListener(this.onInstalled);

        //Add message listener in Browser.
        // @ts-ignore
        browser.runtime.onMessage.addListener(this.onMessage);
    };

    //TODO: Listeners

    /**
     * Extension Installed
     */
    onInstalled = () => {
        console.log('[=====Installed Gmail Contacts Extension=====]');
    };

    /**
     * Message Handler Function from content script and popup page
     *
     * @param message
     * @param sender
     * @param reply
     * @returns
     */
    onMessage = async (message: EXTMessage, sender: Runtime.MessageSender) => {
        console.log('[Message] =>', message);
        switch (message.type) {
            case 'ACTIVE_PAGE_ACTION': {
                browser.pageAction.show(sender.tab?.id || 0);
                break;
            }
            case 'CHECK_AUTH': {
                return await this.getInitialInfo(message?.data?.email || '');
            }
            case 'GET_CONTACTS': {
                return await getContacts(store.dispatch)(message?.data?.email || '');
            }
        }
    };

    /**
     * send message
     */
    sendMessage = (tab: Tabs.Tab, msg: EXTMessage) => {
        return new Promise((resolve) =>
            // @ts-ignore
            browser.tabs.sendMessage(tab.id as number, msg, (response: Message) => {
                resolve(response);
            })
        );
    };

    getInitialInfo = (email: string) => {
        return getUser(store.dispatch)(email);
    };
}

export const background = new Background();
