import config from 'config';

import passwordHash from '../lib/password-hash';

const roles = config.get('server.roles')

export default class RegistryUserDTO {
    constructor({nickname, email, password}) {
        const passwordHashAndSalt = passwordHash.create(password);
        return {
            nickname,
            email,
            salt: passwordHashAndSalt.salt,
            passwordHash: passwordHashAndSalt.passwordHash,
            roles: [roles.client]
        }
    }
}