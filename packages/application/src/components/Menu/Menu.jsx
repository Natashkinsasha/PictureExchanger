import React from 'react';
import {Container} from 'semantic-ui-react';

import DesktopMenu from './DesktopMenu.jsx';

export default (props) => {
    return (
        <Container>
            <DesktopMenu {...props}/>
            {props.children}
        </Container>
    );
};








