import mongodb from 'mongodb';

export default class MongoDao{

    constructor({db}){
        this.db = db;
    }

    clear = ({collection}) => {
        return this.db.collection(collection).deleteMany({});
    };

    remove = ({id, collection}) => {
        return this.db.collection(collection).deleteOne({_id: new mongodb.ObjectID(id)});
    };

}