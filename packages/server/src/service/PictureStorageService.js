import Promise from 'bluebird';
import config from 'config';
import deasync from 'deasync';
import Backblaze from 'backblaze-b2';
import shortid from 'shortid';
export default class PictureStorageService{

    constructor(){
        this.accountId = config.get('backblaze.account_id');
        this.applicationKey = config.get('backblaze.application_key');
        //this.b2 = Promise.promisifyAll(new Backblaze({ accountId: this.accountId, applicationKey: this.applicationKey }));
        //deasync(this.b2.authorize)();
    }

    save = () => {
        return Promise.resolve(shortid.generate());
    };

    remove = () => {

    };

}