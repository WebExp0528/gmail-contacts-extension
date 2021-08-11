import IbxSDKMgr from 'content/inboxSDK';
import React from 'react';
import GoogleButton from 'react-google-button';
import { openSignInWindow } from 'utils/openSignInWindow';

const ModalOAuth = () => {
    const handleClickOAuth = () => {
        openSignInWindow(`${process.env.OAUTH_URL}/${IbxSDKMgr.getEmail()}`, 'Google OAuth');
    };
    return (
        <div>
            <GoogleButton onClick={handleClickOAuth} />
        </div>
    );
};

export default ModalOAuth;
