import axios from 'axios'


export function login(user){
    return axios.post('api/auth/login', user);
}

export function singUp(user){
    return axios.post('api/auth/registry', user);
}


export function logout(user){
    return axios.get('api/auth/logout', user);
}


export function updateTokens(user){
    return axios.post('api/auth/update', user);
}
