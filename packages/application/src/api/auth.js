import axios from 'axios'


export function login({nicknameOrEmail, password}){
    return axios.post('/api/auth/login', {nicknameOrEmail, password})
}

export function registration({nickname, email, password}){
    return axios.post('/api/auth/registry', {nickname, email, password});
}

export function loginFacebook() {
    return axios.get('/api/auth/facebook');
}

