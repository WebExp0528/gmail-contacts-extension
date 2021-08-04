import React from 'react';
import { render } from 'react-dom';

import { config } from 'utils/config';
import { browser } from 'webextension-polyfill-ts';

class InboxSDKManager {
    _sdk: InboxSDK.InboxSDKInstance;

    init = async (): Promise<void> => {
        try {
            this._sdk = await this.setupSDK();

            this._sdk.Compose.registerComposeViewHandler(this.onComposeView);
            this._sdk.Lists.registerThreadRowViewHandler(this.onThreadView);
        } catch (error) {
            this.log('Error in init function', error);
        }
    };

    log = (msg: string, ...other: any[]): void => {
        console.log(`[InboxSDKManager]${msg}`, ...other);
    };

    setupSDK = (): Promise<InboxSDK.InboxSDKInstance> => {
        return new Promise((resolve) => {
            InboxSDK.load(2, config.inboxSdkId).then(resolve);
        });
    };

    onComposeView = (composeView: InboxSDK.Compose.ComposeView): void => {
        this.log('Compose View', composeView);
    };

    onThreadView = (threadView: InboxSDK.Lists.ThreadRowView): void => {
        /* --------------------------- Add Tracking Button -------------------------- */
        threadView.addButton({
            title: 'Tracking',
            iconUrl: browser.runtime.getURL('/assets/img/tracking.png'),
            onClick: () => {
                this.showModal(<h1>Tracking is coming soon</h1>, { showCloseButton: true });
            },
        });
    };

    showModal = (children: React.ReactNode, options: Omit<InboxSDK.Widgets.ModalOptions, 'el'>): void => {
        const rootEl = document.createElement('div');

        render(<>{children}</>, rootEl);
        const newOptions: InboxSDK.Widgets.ModalOptions = {
            ...options,
            el: rootEl,
        };
        this._sdk.Widgets.showModalView(newOptions);
    };
}

export default InboxSDKManager;
