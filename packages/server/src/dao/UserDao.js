
export default class UserDAO{

    constructor({db}){
        this.db = db;
    }

    create = (user) => {
        return db.collection('user').insertOne(user)
    };

    findByEmail = ({email}) =>{
        return db.collection('user').findOne({email});
    };

    findByNickname = ({nickname}) =>{
        return db.collection('user').findOne({nickname});
    };
}