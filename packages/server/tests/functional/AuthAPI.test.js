import chai from 'chai';
import chaiHttp from 'chai-http';
import dirtyChai from 'dirty-chai';
import shortid from 'shortid';
import Promise from 'bluebird';

chai.use(dirtyChai);
chai.use(chaiHttp);
const {expect} = chai;

const serverURL = `http://localhost:${3000}`;

describe('Test auth API', () => {

    afterEach((done) => {
        Promise
            .all([
                chai
                    .request(serverURL)
                    .delete('/api/mongo/clear')
                    .query({collection: 'users'}),
                chai
                    .request(serverURL)
                    .delete('/api/redis/clear'),
            ])
            .then(()=> {
                done();
            })
            .catch(done);

    });

    describe('#POST /api/auth/registry', () => {

        it('should registry user with nickname, email and password', (done) => {
            const nickname = shortid.generate();
            const email = shortid.generate() + '@gmail.com';
            const password = shortid.generate();
            chai
                .request(serverURL)
                .post('/api/auth/registry')
                .send({nickname, email, password})
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json();
                    expect(res.body).to.have.property('accessToken').be.a('string');
                    expect(res.body).to.have.property('refreshToken').be.a('string');
                    expect(res.body).to.have.property('user').be.a('object');
                    expect(res.body.user).to.have.property('id').be.a('string');
                    expect(res.body.user).to.have.property('nickname', nickname).be.a('string');
                    expect(res.body.user).to.have.property('email', email).be.a('string');
                    expect(res.body.user).to.have.property('roles').be.a('array');
                    expect(res.body.user.roles).to.include('client');
                    done();
                })
                .catch(done)
        });

    });


    describe('#POST /api/auth/login', () => {


        it('should login user by him nickname and password', (done) => {
            const nickname = shortid.generate();
            const email = shortid.generate() + '@gmail.com';
            const password = shortid.generate();
            chai
                .request(serverURL)
                .post('/api/auth/registry')
                .send({nickname, email, password})
                .then((res) => {
                    return chai
                        .request(serverURL)
                        .post('/api/auth/login')
                        .send({nicknameOrEmail: nickname, password})
                })
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json();
                    expect(res.body).to.have.property('accessToken').be.a('string');
                    expect(res.body).to.have.property('refreshToken').be.a('string');
                    expect(res.body).to.have.property('user').be.a('object');
                    expect(res.body.user).to.have.property('id').be.a('string');
                    expect(res.body.user).to.have.property('nickname', nickname).be.a('string');
                    expect(res.body.user).to.have.property('email', email).be.a('string');
                    expect(res.body.user).to.have.property('roles').be.a('array');
                    expect(res.body.user.roles).to.include('client');
                    done();
                })
                .catch(done)
        });


        it('should login user by him email and password', (done) => {
            const nickname = shortid.generate();
            const email = shortid.generate() + '@gmail.com';
            const password = shortid.generate();
            chai
                .request(serverURL)
                .post('/api/auth/registry')
                .send({nickname, email, password})
                .then((res) => {
                    return chai
                        .request(serverURL)
                        .post('/api/auth/login')
                        .send({nicknameOrEmail: email, password})
                })
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json();
                    expect(res.body).to.have.property('accessToken').be.a('string');
                    expect(res.body).to.have.property('refreshToken').be.a('string');
                    expect(res.body).to.have.property('user').be.a('object');
                    expect(res.body.user).to.have.property('id').be.a('string');
                    expect(res.body.user).to.have.property('nickname', nickname).be.a('string');
                    expect(res.body.user).to.have.property('email', email).be.a('string');
                    expect(res.body.user).to.have.property('roles').be.a('array');
                    expect(res.body.user.roles).to.include('client');
                    done();
                })
                .catch(done)
        });

    });


    describe('#GET /api/auth/logout', () => {

        it('should registry user with nickname, email and password', (done) => {
            const nickname = shortid.generate();
            const email = shortid.generate() + '@gmail.com';
            const password = shortid.generate();
            chai
                .request(serverURL)
                .post('/api/auth/registry')
                .send({nickname, email, password})
                .then((res) => {
                    return chai
                        .request(serverURL)
                        .get('/api/auth/logout')
                        .set('authorization', res.body.accessToken)
                })
                .then((res) => {
                    expect(res).to.have.status(204);
                    done();
                })
                .catch(done)
        });

    });

    describe('#POST /api/auth/update', () => {

        it('should update user tokens', (done) => {
            const nickname = shortid.generate();
            const email = shortid.generate() + '@gmail.com';
            const password = shortid.generate();
            chai
                .request(serverURL)
                .post('/api/auth/registry')
                .send({nickname, email, password})
                .then((res) => {
                    return chai
                        .request(serverURL)
                        .post('/api/auth/update')
                        .send({refreshToken: res.body.refreshToken});
                })
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json();
                    expect(res.body).to.have.property('accessToken').be.a('string');
                    expect(res.body).to.have.property('refreshToken').be.a('string');
                    expect(res.body).to.have.property('user').be.a('object');
                    expect(res.body.user).to.have.property('id').be.a('string');
                    expect(res.body.user).to.have.property('nickname', nickname).be.a('string');
                    expect(res.body.user).to.have.property('email', email).be.a('string');
                    expect(res.body.user).to.have.property('roles').be.a('array');
                    expect(res.body.user.roles).to.include('client');
                    done();
                })
                .catch(done)
        });

    });


});