export default class PictureDTO {

    constructor({id, _id, name, tags, description, url, likes, isPrivate, uploadDate, user_id }) {
        return {id: id || _id.toString(), name, tags, description, url, likes, isPrivate, uploadDate, user_id: user_id.toString()};
    }
}