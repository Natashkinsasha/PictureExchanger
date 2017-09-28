import crypto from 'crypto';

export default class RegistryUserDTO {
    constructor({nickname, email, password}) {
        const salt = crypto.randomBytes(128).toString('base64');
        const passwordHash = crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1');
        return {
            nickname,
            email,
            salt,
            passwordHash
        }
    }
}