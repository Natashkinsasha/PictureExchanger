
export default class MongoService{
    constructor({mongoDao}){
        this.mongoDao = mongoDao;
    }

    clear = () => {
        return this.mongoDao.clear();
    };

    remove = ({id}) => {
        return this.mongoDao.remove({id});
    };
}