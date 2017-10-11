import PictureDTO from '../dto/PictureDTO';
import TagDTO from '../dto/TagDTO';
import mongodb from 'mongodb';

//TODO Добавить индексы
//TODO Добавить валидацию
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

    find = ({user_id, onlyMy = false, sortBy = 'uploadDate', page = 1, count = 10, tags, name}) => {
        const limit = count;
        const skip = count * (page - 1);
        let query = {};
        if (tags) {
            query = {...query, tags: {$all: tags}};
        }
        if (name) {
            //TODO добавить поиск по подстроке и без чуствительности к регистру
            query = {...query, name};
        }
        if (onlyMy) {
            query = {...query, user_id: new mongodb.ObjectID(user_id)}
        }
        if (!onlyMy) {
            query = {...query, $or: [{user_id: new mongodb.ObjectID(user_id)}, {isPrivate: false}]}
        }
        return this.db.collection('pictures')
            .find(query)
            .sort({sortBy: 1})
            .skip(skip)
            .limit(limit)
            .toArray()
            .map((picture) => {
                return new PictureDTO(picture);
            });
    };

    getPopularTags = ({count = 10}) => {
        return this.db.collection('pictures')
            .aggregate(
                [{$unwind: "$tags"}, {$sortByCount: "$tags"}, {$limit: count}]
            )
            .toArray()
            .map((tag) => {
                return new TagDTO(tag);
            })
    };

}