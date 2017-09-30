import passwordHash from '../lib/password-hash';

export default class RegistryUserDTO {
    constructor({nickname, email, password}) {
        const passwordHashAndSalt = passwordHash.create(password);
        return {
            nickname,
            email,
            salt: passwordHashAndSalt.salt,
            passwordHash: passwordHashAndSalt.passwordHash,
        }
    }
}