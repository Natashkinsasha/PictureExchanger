export default class UserDTO {
    constructor({_id, nickname, email, salt, passwordHash, roles}) {
        return {id: _id.toString(), nickname, email, salt, passwordHash, roles};
    }
}