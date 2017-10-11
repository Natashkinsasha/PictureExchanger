import PictureDTO from '../dto/PictureDTO';


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

    find = ({owner, onlyMy = false, sortBy = 'uploadDate', page = 1, count = 10, tags, name}) => {
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
            query = {...query, owner: new mongodb.ObjectID(owner)}
        }
        if (!onlyMy && owner) {
            query = {...query, $or: [{owner: new mongodb.ObjectID(owner)}, {isPrivate: false}]}
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
                {$unwind: "$tags"},
                {
                    $group: {_id: "$tags", score: {"$sum": 1}},
                },
            )
            .toArray()
            .tap(console.log)
    };

}