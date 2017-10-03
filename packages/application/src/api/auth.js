import axios from 'axios'


export function login(user){
    return axios.post('/api/auth/login', user);
}

export function singUp(user){
    return axios.post('/api/auth/register', user);
}

