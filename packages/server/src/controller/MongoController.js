
export default class MongoController{

    constructor({mongoService}){
        this.mongoService = mongoService;
    }

    clear = () => {
        return this.mongoService.clear();
    };

    remove = ({id}) => {
        return this.mongoService.remove({id});
    };
}