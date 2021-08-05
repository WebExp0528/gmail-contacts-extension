const GmailFactory = require('gmail-js');

class GmailJSMgr {
    static gmail: Gmail;
    static instance: GmailJSMgr;

    static create = async (): Promise<void> => {
        GmailJSMgr.instance = new GmailJSMgr();
    };

    constructor() {
        GmailJSMgr.gmail = new GmailFactory.Gmail() as Gmail;
        this.setupThreadRowView();
    }

    setupThreadRowView = (): void => {
        const thread = GmailJSMgr.gmail.new.get.thread_data();
        console.log('El is', thread);
    };
}

export default GmailJSMgr;
