import React from 'react';
import { browser } from 'webextension-polyfill-ts';

import IbxSDKMgr from './inboxSDK';
import GmailJSMgr from './gmailJS';
import { getStore } from '@redux/getStore';
import { Provider } from 'react-redux';
import { sendMessage } from 'utils/sendMessages';
import { useRedux } from '@redux';
import ModalOAuth from 'components/ModalOAuth';

export const App = () => {
    const store = getStore();

    const handleThreadRowView = (threadView: InboxSDK.Lists.ThreadRowView): void => {
        /* --------------------------- Add Tracking Button -------------------------- */
        threadView.addButton({
            iconClass: 'g-ext-tracking',
            title: 'Tracking',
            iconUrl: browser.runtime.getURL('/assets/img/tracking.png'),
            onClick: () => {
                IbxSDKMgr.showModal(<h1>Tracking is coming soon</h1>, { showCloseButton: true });
            },
        });

        /* --------------------------- Add CheckMark Icon -------------------------- */
        const threadContacts = threadView.getContacts().filter((el) => el.name !== 'me');

        let isContacted = false;
        const {
            contacts: { contacts: contactList },
        } = store.getState();

        threadContacts.forEach(({ emailAddress }) => {
            const result = contactList?.find((el: any) => el.email === emailAddress);
            if (result) {
                isContacted = true;
            }
        });
        if (isContacted) {
            threadView.addAttachmentIcon({
                iconClass: 'attachment',
                iconHtml: `<div style="background-image:url(${browser.runtime.getURL(
                    '/assets/img/check.png'
                )});background-size:20px;width:20px;height:20px"></div>`,
            });
        }
    };

    React.useEffect(() => {
        const init = async () => {
            try {
                await IbxSDKMgr.create({ onThreadRowView: handleThreadRowView });
                GmailJSMgr.create();
                const email = IbxSDKMgr.getEmail();
                const res = await sendMessage({ type: 'CHECK_AUTH', data: { email } });

                if (!res) {
                    IbxSDKMgr.showModal(<ModalOAuth />, { showCloseButton: true });
                } else {
                    await sendMessage({ type: 'GET_CONTACTS', data: { email } });
                    IbxSDKMgr.authenticated();
                }
            } catch (error) {
                console.log('[Error in InboxSDK]', error);
            }
        };
        init();
    }, []);

    return <Provider store={store}>{}</Provider>;
};

export default App;
