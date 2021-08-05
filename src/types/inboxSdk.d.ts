declare type InboxSDKOptions = {
    /**
     * ThreadRowView Handler
     */
    onThreadRowView?: (threadView: InboxSDK.Lists.ThreadRowView) => void;

    /**
     * ComposeView Handler
     */
    onComposeView?: (composeView: InboxSDK.Compose.ComposeView) => void;
};
