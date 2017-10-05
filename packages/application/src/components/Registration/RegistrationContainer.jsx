import React from 'react';

import Registration from './Registration.jsx';

class RegistrationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                nickname: '',
                email: '',
                password: '',
                repeatPassword: '',
            },
            formLoading: false,
        }
    }

    onChange = (user) => {
        this.setState({user: {...this.state.user, ...user}});
    };

    render = () => {
        return (
            <Registration {...{onChange: this.onChange, ...this.state}}/>
        )
    }
}

export default RegistrationContainer;