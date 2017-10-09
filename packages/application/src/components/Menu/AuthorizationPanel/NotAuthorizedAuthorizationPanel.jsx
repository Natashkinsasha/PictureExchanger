import React from 'react';
import {Menu, Button } from 'semantic-ui-react';

export default ({onEmailClick, onREGISTRATIONrClick, onVKClick, onFacebookClick}) => {
    return (
        <Menu.Menu position="right">
            <Menu.Item>
                <Button circular primary onClick={onREGISTRATIONrClick}>Sign up</Button>
            </Menu.Item>
            <Menu.Item>
                or enter:
            </Menu.Item>
            <Menu.Item>
                <Button circular onClick={onEmailClick}>email</Button>
                <Button circular onClick={onVKClick} color='vk' icon='vk'/>
                <Button circular onClick={onFacebookClick} color='facebook' icon='facebook'/>
            </Menu.Item>
        </Menu.Menu>
    );
};