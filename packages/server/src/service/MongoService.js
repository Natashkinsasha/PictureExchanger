
export default class MongoService{
    constructor({mongoDao}){
        this.mongoDao = mongoDao;
    }

    clear = ({collection}) => {
        return this.mongoDao.clear({collection});
    };

    remove = ({id, collection}) => {
        return this.mongoDao.remove({id, collection});
    };
}