import mongodb from 'mongodb';

export default class NewPictureDTO {

    constructor({name, tags, description, url, isPrivate = true, user_id}) {
        return {name, tags, description, url, isPrivate, uploadDate: new Date(), likes: 0, user_id: new mongodb.ObjectID(user_id)};
    }

}