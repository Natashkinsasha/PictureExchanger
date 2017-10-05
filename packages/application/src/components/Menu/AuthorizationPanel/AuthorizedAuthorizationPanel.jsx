import React from 'react';
import {Menu, Button } from 'semantic-ui-react';

export default ({onLogoutClick}) => {
    return (
        <Menu.Menu position="right">
            <Menu.Item>
                <Button onClick={onLogoutClick}>Logout</Button>
            </Menu.Item>
        </Menu.Menu>
    )
};