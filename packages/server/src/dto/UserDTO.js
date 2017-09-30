export default class UserDTO {
    constructor({_id, nickname, email, salt, passwordHash}) {
        return {id: _id.toString(), nickname, email, salt, passwordHash};
    }
}