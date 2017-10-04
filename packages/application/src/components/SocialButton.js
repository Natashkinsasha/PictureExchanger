import React from 'react';
import {Button, Icon} from 'semantic-ui-react'

const SocialButton = ({onFacebookClick}) => {
    return (
        <Button.Group widths='2'>
            <Button color='vk'>
                <Icon name='vk'/> VK
            </Button>
            <Button color='facebook' onClick={(e) => {
                e.preventDefault();
                props.onFacebookClick()
            }}>
                <Icon name='facebook'/> Facebook
            </Button>
        </Button.Group>
    )
};

export default SocialButton;
