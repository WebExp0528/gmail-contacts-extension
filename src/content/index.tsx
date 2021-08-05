import React from 'react';
import ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import jquery from 'jquery';

import { sendMessage } from 'utils/sendMessages';

import { getStore } from '../@redux/getStore';
import { onRequest } from './scripts/onRequest';

import App from './App';

import './App.scss';

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);

const store = getStore();

jquery(async () => {
    try {
        /**
         * Setup Popup Page
         */
        sendMessage({
            type: 'ACTIVE_PAGE_ACTION',
        });
        /**
         * Set up Message Listener
         */
        browser.runtime.onMessage.addListener(onRequest);

        store.ready().then(() => {
            ReactDOM.render(<App></App>, app);
        });
    } catch (error) {
        console.log('Error in Init', error);
    }
});
