import chai from 'chai';
import chaiHttp from 'chai-http';
import dirtyChai from 'dirty-chai';
import config from 'config';
import shortid from 'shortid';

chai.use(dirtyChai);
chai.use(chaiHttp);
const {expect} = chai;

const serverURL = `localhost:${3000}`;

describe('Test auth API', () => {

    describe('', () => {

        it('', (done) => {
            const nickname = shortid.generate();
            const email = shortid.generate();
            const password = shortid.generate();
            chai
                .request(serverURL)
                .post('/api/registry')
                .send(nickname, email, password)
                .then((res)=>{
                    expect(res).to.have.status(200);
                    expect(res).to.be.json();
                    expect(res.body).to.have.property('accessToken');
                    expect(res.body).to.have.property('refreshToken');
                    expect(res.body).to.have.property('user');
                    console.log(res.body);
                })
                .catch(done)
        })

    });

});