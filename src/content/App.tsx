import React from 'react';
import { Provider } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

import IbxSDKMgr from './inboxSDK';
import GmailJSMgr from './gmailJS';
import { getStore } from '../@redux/getStore';

export type AppProps = {
    children?: React.ReactNode;
};

export const App = ({ children }: AppProps) => {
    const store = getStore();

    const handleThreadRowView = (threadView: InboxSDK.Lists.ThreadRowView): void => {
        /* --------------------------- Add Tracking Button -------------------------- */
        threadView.addButton({
            title: 'Tracking',
            iconUrl: browser.runtime.getURL('/assets/img/tracking.png'),
            onClick: () => {
                IbxSDKMgr.showModal(<h1>Tracking is coming soon</h1>, { showCloseButton: true });
            },
        });

        /* --------------------------- Add CheckMark Icon -------------------------- */
        threadView.addAttachmentIcon({
            iconClass: 'attachmenttest',
            iconHtml: `<div style="background-image:url(${browser.runtime.getURL(
                '/assets/img/check.png'
            )});background-size:20px;width:20px;height:20px"></div>`,
        });
    };

    React.useEffect(() => {
        const init = async () => {
            await IbxSDKMgr.create({ onThreadRowView: handleThreadRowView });
            GmailJSMgr.create();
        };
        init();
    }, []);

    return <Provider store={store}>{children}</Provider>;
};

export default App;
