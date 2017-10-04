import React from 'react';
import {Checkbox, Form, Input, Select, Segment, Button, Grid, Header, Message, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {singUp, loginFacebook} from '../api/auth';
import {
    singUpSuccess,
    singUpFailure
} from '../actions/user';
import SocialButton from './SocialButton';
import {push, goBack} from 'react-router-redux';


class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            email: "",
            password: "",
            repeatPassword: "",
            formLoading: false,
        }
    }

    onSignUpClick = (user) => {
        this.setState({formLoading: true});
        this.props
            .onSignUp({
                nickname: user.nickname,
                email: user.email,
                password: user.password,
            })
            .then(() => {
                this.setState({formLoading: false});
            });
    };

    onFacebookClick = () =>{
        this.setState({formLoading: true});
        this.props
            .onFacebookLogin()
            .then(() => {
                this.setState({formLoading: false});
            });
    };

    render() {
        return (
            <Grid container verticalAlign='middle' centered>
                <Grid.Row>
                    <Grid.Column mobile={12} tablet={9} computer={6}>
                        <Segment>
                            <Header as='h2' textAlign='center'>
                                Регистрация
                            </Header>
                            <Form loading={this.state.formLoading}>
                                <Form.Input icon='user' iconPosition='left' label='Логин' value={this.state.nickname}
                                            onChange={(e) => {
                                                this.setState({nickname: e.target.value});
                                            }}/>
                                <Form.Input icon='mail outline' iconPosition='left' label='Электронная почта'
                                            value={this.state.email}
                                            onChange={(e) => {
                                                this.setState({email: e.target.value});
                                            }}/>
                                <Form.Input icon='unlock alternate' iconPosition='left' label='Пароль' type='password'
                                            value={this.state.password} onChange={(e) => {
                                    this.setState({password: e.target.value});
                                }}/>
                                <Form.Input icon='lock' iconPosition='left' label='Повторите пароль' type='password'
                                            value={this.state.repeatPassword} onChange={(e) => {
                                    this.setState({repeatPassword: e.target.value});
                                }}/>
                                <Button fluid positive onClick={(e) => {
                                    e.preventDefault();
                                    this.onSignUpClick({
                                        nickname: this.state.nickname,
                                        email: this.state.email,
                                        password: this.state.password,
                                        repeatPassword: this.state.repeatPassword,
                                    });
                                }}>Отправить</Button>
                                <Divider fitted/>
                                <Button fluid color='orange' onClick={(e) => {
                                    e.preventDefault();
                                    this.props.goBack();
                                }}>Назад</Button>
                                <Divider/>
                                <SocialButton onFacebookClick = {this.onFacebookClick}/>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default connect(null, (dispatch) => (
    {
        onSignUp: (user) => {
            return singUp(user)
                .then((response) => {
                    const user = response.data.user;
                    return dispatch(singUpSuccess(user, response))
                        .then(() => {
                            return dispatch(push("/"));
                        });
                }, (err) => {
                    return dispatch(singUpFailure(err.response));
                });
        },
        onFacebookLogin: ()=>{
            return loginFacebook()
                .then((response) => {
                    console.log(response)
                    const user = response.data.user;
                    return dispatch(singUpSuccess(user, response))
                        .then(() => {
                            return dispatch(push("/"));
                        });
                }, (err) => {
                    console.log(err.response)
                    return dispatch(singUpFailure(err.response));
                });
        },
        goBack: () => {
            return dispatch(goBack());
        }
    }
))(SignUp);