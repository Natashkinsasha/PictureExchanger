import axios from 'axios'


export function login(user){
    return axios.post('/api/auth/login', user);
}

export function REGISTRATION(user){
    return axios.post('/api/auth/registry', user);
}

export function loginFacebook() {
    return axios.get('/api/auth/facebook');
}

