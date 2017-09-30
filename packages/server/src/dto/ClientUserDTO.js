
export default class ClientUserDTO {

    constructor({id, _id, nickname, email}) {
        return {id: id || _id.toString(), nickname, email}
    }

}