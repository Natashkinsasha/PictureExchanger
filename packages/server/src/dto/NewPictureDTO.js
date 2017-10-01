export default class NewPictureDTO {

    constructor({name, tags, description, url, isPrivate = true, owner}) {
        return {name, tags, description, url, isPrivate, uploadDate: new Date(), likes: 0, owner};
    }

}