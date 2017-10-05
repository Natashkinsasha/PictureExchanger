import React from 'react';

import Login from './Login.jsx';


class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                nickname: '',
                password: '',
            },
            formLoading: false,
        }
    }

    onChange = (user) => {
        this.setState({user: {...this.state.user, ...user}});
    };

    render = () => {
        return (
            <Login {...{onChange: this.onChange, ...this.state}}/>
        )
    }
}

export default LoginContainer;