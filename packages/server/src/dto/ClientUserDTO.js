
export default class ClientUserDTO {

    constructor({id, _id, nickname, email, roles, facebook}) {
        return {id: id || _id.toString(), nickname, email, roles, facebook};
    }

}