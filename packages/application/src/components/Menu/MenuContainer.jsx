import React from 'react';

import Menu from './Menu.jsx';

class MenuContainer extends React.Component {

    constructor(props) {
        super(props);
    }


    render = () => {
        return (
            <Menu>
                {this.props.children}
            </Menu>
        )
    }

}

export default MenuContainer;