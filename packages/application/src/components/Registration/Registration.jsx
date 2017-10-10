import React from 'react';
import {Checkbox, Form, Input, Select, Segment, Button, Grid, Header, Message, Divider} from 'semantic-ui-react';


export default (props) => {
    const {user, formLoading, onChange, onRegistrationClick, onBackClick, onLoginClick} = props;
    return (
        <Grid container verticalAlign='middle' centered>
            <Grid.Row>
                <Grid.Column mobile={12} tablet={9} computer={6}>
                    <Segment>
                        <Header as='h2' textAlign='center'>
                            Registration
                        </Header>
                        <Form loading={formLoading}>
                            <Form.Input icon='user'
                                        iconPosition='left'
                                        label='Username'
                                        value={user.nickname}
                                        onChange={(e) => {
                                            onChange({nickname: e.target.value});
                                        }}/>
                            <Form.Input icon='mail outline'
                                        iconPosition='left'
                                        label='Email'
                                        value={user.email}
                                        onChange={(e) => {
                                            onChange({email: e.target.value});
                                        }}/>
                            <Form.Input icon='unlock alternate'
                                        iconPosition='left'
                                        label='Пароль'
                                        type='password'
                                        value={user.password}
                                        onChange={(e) => {
                                            onChange({password: e.target.value});
                                        }}/>
                            <Form.Input icon='lock'
                                        iconPosition='left'
                                        label='Повторите пароль'
                                        type='password'
                                        value={user.repeatPassword}
                                        onChange={(e) => {
                                            onChange({repeatPassword: e.target.value});
                                        }}/>
                            <Button fluid
                                    positive
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onRegistrationClick();
                                    }}>Send</Button>
                            <Divider fitted/>
                            <Button fluid
                                    color='orange'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onBackClick();
                                    }}>Back</Button>
                            <Divider horizontal>Or</Divider>
                            <Button fluid
                                    color='blue'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onLoginClick();
                                    }}>Login</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
