import React from 'react';

import AuthorizedAuthorizationPanel from './AuthorizedAuthorizationPanel.jsx';
import NotAuthorizedAuthorizationPanel from './NotAuthorizedAuthorizationPanel.jsx';

export default ({isAuthorized, onLogoutClick, ...props}) => {

    if (isAuthorized) {
        return <AuthorizedAuthorizationPanel {...{onLogoutClick}}/>
    }
    return <NotAuthorizedAuthorizationPanel {...props}/>
};


