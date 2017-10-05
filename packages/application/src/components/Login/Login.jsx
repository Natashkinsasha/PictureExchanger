import React from 'react';
import {Form, Segment, Button, Grid, Header, Divider } from 'semantic-ui-react';


export default (props) => {
    const {user, formLoading, onChange, onClickSend, onClickBack} = props;
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
                                        label='Nickname'
                                        value={user.nickname}
                                        onChange={(e) => {
                                            onChange({nickname: e.target.value})
                                        }}/>
                            <Form.Input icon='lock'
                                        iconPosition='left'
                                        label='Пароль'
                                        type='password'
                                        value={user.password}
                                        onChange={(e) => {
                                            onChange({password: e.target.value})
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
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};
