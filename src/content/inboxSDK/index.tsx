import React from 'react';
import { render } from 'react-dom';

import { config } from 'utils/config';
import { InboxSDKOptions } from 'types/inboxSdk';

class IbxSDKMgr {
    /* ---------------------------- Static members ---------------------------- */

    static sdk: InboxSDK.InboxSDKInstance;
    static instance: IbxSDKMgr;

    /* -------------------------------------------------------------------------- */
    /*                          Create IbxSDKMgr Instance                         */
    /* -------------------------------------------------------------------------- */
    static create = async (options: InboxSDKOptions = {}): Promise<IbxSDKMgr> => {
        if (!IbxSDKMgr.instance) {
            IbxSDKMgr.instance = new IbxSDKMgr(options);
        }
        await IbxSDKMgr.instance.initialize();
        return IbxSDKMgr.instance;
    };

    /* -------------------------------------------------------------------------- */
    /*                          Show Modal with InboxSDK                          */
    /* -------------------------------------------------------------------------- */
    static showModal = (children: React.ReactNode, options: Omit<InboxSDK.Widgets.ModalOptions, 'el'>): void => {
        const rootEl = document.createElement('div');

        render(<>{children}</>, rootEl);
        const newOptions: InboxSDK.Widgets.ModalOptions = {
            ...options,
            el: rootEl,
        };
        IbxSDKMgr.sdk.Widgets.showModalView(newOptions);
    };

    /* --------------------- Member variables and functions --------------------- */

    removeHandlers: any[] = [];
    onComposeView: InboxSDKOptions['onComposeView'] = undefined;
    onThreadRowView: InboxSDKOptions['onThreadRowView'] = undefined;

    constructor(options: InboxSDKOptions = {}) {
        const { onComposeView, onThreadRowView } = options;
        this.onComposeView = onComposeView;
        this.onThreadRowView = onThreadRowView;
    }

    private initialize = async (): Promise<void> => {
        try {
            IbxSDKMgr.sdk = await this.setupSDK();
            this.removeHandlers.forEach((el) => el());

            if (this.onComposeView) {
                this.removeHandlers.push(IbxSDKMgr.sdk.Compose.registerComposeViewHandler(this.onComposeView));
            }
            if (this.onThreadRowView) {
                this.removeHandlers.push(IbxSDKMgr.sdk.Lists.registerThreadRowViewHandler(this.onThreadRowView));
            }
        } catch (error) {
            this.log('Error in init function', error);
        }
    };

    private log = (msg: string, ...other: any[]): void => {
        console.log(`[IbxSDKMgr]${msg}`, ...other);
    };

    private setupSDK = (): Promise<InboxSDK.InboxSDKInstance> =>
        new Promise((resolve) => {
            InboxSDK.load(2, config.inboxSdkId).then(resolve);
        });
}

export default IbxSDKMgr;
