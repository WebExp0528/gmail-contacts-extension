let windowObjectReference: any = null;
let previousUrl: string | null = null;
let closeInterval: any;

export const openSignInWindow = (url: string, name = 'Gmail Extension', popupWinWidth = 600, popupWinHeight = 700) => {
    // window features
    const windowLeft = window.screen.width / 2 - popupWinWidth / 2;
    const windowTop = window.screen.height / 2 - popupWinHeight / 2;
    const strWindowFeatures = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=600, height=700, top=${windowTop}, right=${windowLeft}`;

    if (windowObjectReference === null || windowObjectReference.closed) {
        /* if the pointer to the window object in memory does not exist
       or if such pointer exists but the window was closed */
        windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
        /* if the resource to load is different,
       then we load it in the already opened secondary window and then
       we bring such window back on top/in front of its parent window. */
        windowObjectReference = window.open(url, name, strWindowFeatures);
        windowObjectReference.focus();
    } else {
        /* else the window reference must exist and the window
       is not closed; therefore, we can bring it back on top of any other
       window with the focus() method. There would be no need to re-create
       the window or to reload the referenced resource. */
        windowObjectReference.focus();
    }
    // assign the previous URL
    previousUrl = url;

    closeInterval = setInterval(() => {
        if (!windowObjectReference || !windowObjectReference.closed) return;
        clearInterval(closeInterval);
        window.location.reload();
    }, 100);
};
