import Promise from 'bluebird';
import crypto from 'crypto';

export default {
    create: (password) => {
        const salt = crypto.randomBytes(128).toString('base64');
        const passwordHash = crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1');
        return {passwordHash, salt};
    },
    validate: (password, salt, passwordHash)=>{
        return crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1').equals(passwordHash);
    },
}