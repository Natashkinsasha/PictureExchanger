import PictureDTO from '../dao/PictureDAO';

export default class PictureDAO {

    constructor({db}) {
        this.db = db;
    }

    create = (picture) => {
        return this.db.collection('pictures')
            .insertOne(picture)
            .then(() => {
                return new PictureDTO(picture);
            })
    };

    remove = ({id}) => {
        return this.db.collection('pictures').deleteOne({_id: new mongodb.ObjectID(id)});
    };

    update = (picture) => {

    };

    find = ({onlyMy = false, sortBy = 'uploadDate', page = 1, count = 10}) => {

    };

    findByTags = ({onlyMy = false, sortBy = 'uploadDate', page = 1, count = 10, tags = []}) => {

    };

    findByName = ({onlyMy = false, sortBy = 'uploadDate', page = 1, count = 10, name = ''}) => {

    };

    getPopularTags = ({count}) => {

    };

}