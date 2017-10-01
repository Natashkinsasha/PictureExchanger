
export default class ClientUserDTO {

    constructor({id, _id, nickname, email, roles}) {
        return {id: id || _id.toString(), nickname, email, roles};
    }

}