import axios from 'axios'


function login({nicknameOrEmail, password}){
    return axios.post('/api/auth/login', {nicknameOrEmail, password})
}

function registration({nickname, email, password}){
    return axios.post('/api/auth/registry', {nickname, email, password});
}

function loginFacebook() {
    return axios.get('/api/auth/facebook');
}

export default {
    login,
    registration,
    loginFacebook
}