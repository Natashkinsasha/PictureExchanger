import React from 'react';
import {Button, Icon} from 'semantic-ui-react'

const SocialButton = ({onFacebookClick, onVKClick}) => {
    return (
        <div>
            <Button circular color='vk' icon='vk' onClick={(e) => {
                e.preventDefault();
                onVKClick()
            }}/>
            <Button circular color='facebook' icon='facebook' onClick={(e) => {
                e.preventDefault();
                onFacebookClick()
            }}/>
        </div>
    )
};

export default SocialButton;
