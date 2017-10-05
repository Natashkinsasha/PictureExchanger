import React from 'react';

import {Menu} from 'semantic-ui-react';

import AuthorizationPanel from './AuthorizationPanel/AuthorizationPanel.jsx';

export default ({...props}) => {
    return (
        <Menu>
            <Menu.Item header>PictureExchanger</Menu.Item>
            <AuthorizationPanel isAuthorized={props.isAuthorized} onLogin={props.login}
                                onLogout={props.logout}
                                onSingUp={props.singUp}
            />
        </Menu>
    );
};