export default class PictureDTO {

    constructor({id, _id, name, tags, description, url, likes, isPrivate, uploadDate, owner }) {
        return {id: id || _id.toString(), name, tags, description, url, likes, isPrivate, uploadDate, owner};
    }
}