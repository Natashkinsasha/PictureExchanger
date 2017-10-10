import React from 'react';
import {Form, Segment, Button, Grid, Header, Divider} from 'semantic-ui-react';


export default (props) => {
    const {user, formLoading, onChange, onLoginClick, onBackClick} = props;
    return (
        <Grid container verticalAlign='middle' centered>
            <Grid.Row>
                <Grid.Column mobile={12} tablet={9} computer={6}>
                    <Segment>
                        <Header as='h2' textAlign='center'>
                            Login
                        </Header>
                        <Form loading={formLoading}>
                            <Form.Input icon='user'
                                        iconPosition='left'
                                        label='Nickname or email'
                                        value={user.nicknameOrEmail}
                                        onChange={(e) => {
                                            onChange({nicknameOrEmail: e.target.value})
                                        }}/>
                            <Form.Input icon='lock'
                                        iconPosition='left'
                                        label='Password'
                                        type='password'
                                        value={user.password}
                                        onChange={(e) => {
                                            onChange({password: e.target.value})
                                        }}/>
                            <Button fluid
                                    positive
                                    onClick={(e) => {
                                        e.preventDefault();
                                        return onLoginClick();
                                    }}>
                                Send
                            </Button>
                            <Divider fitted/>
                            <Button fluid
                                    color='orange'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        return onBackClick();
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
