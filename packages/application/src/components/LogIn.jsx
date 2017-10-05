import React from 'react';
import {Form, Segment, Button, Grid, Header, Divider } from 'semantic-ui-react';


export default ({formLoading, onChange, onClickSend, onClickBack}) => {
    return (
        <Grid container verticalAlign='middle' centered>
            <Grid.Row>
                <Grid.Column mobile={12} tablet={9} computer={6}>
                    <Segment>
                        <Header as='h2' textAlign='center'>
                            Войти
                        </Header>
                        <Form loading={formLoading}>
                            <Form.Input icon='user'
                                        iconPosition='left'
                                        label='Логин'
                                        value={this.state.login}
                                        onChange={(e) => {
                                            onChange({login: e.target.value})
                                        }}/>
                            <Form.Input icon='lock'
                                        iconPosition='left'
                                        label='Пароль'
                                        type='password'
                                        value={this.state.password}
                                        onChange={(e) => {
                                            onChange({login: e.target.value})
                                        }}/>
                            <Button fluid
                                    positive
                                    onClick={(e) => {
                                        e.preventDefault();
                                        return onClickSend()
                                    }}>
                                Send
                            </Button>
                            <Divider fitted/>
                            <Button fluid
                                    color='orange'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        return onClickBack();
                                    }}>
                                Back
                            </Button>
                            <Divider/>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};
