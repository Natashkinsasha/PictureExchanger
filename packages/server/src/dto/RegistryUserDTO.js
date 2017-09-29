import passwordHash from '../lib/password-hash';

export default class RegistryUserDTO {
    constructor({nickname, email, password}) {
        const {passwordHash, salt} = passwordHash.create(password);
        return {
            nickname,
            email,
            salt,
            passwordHash
        }
    }
}