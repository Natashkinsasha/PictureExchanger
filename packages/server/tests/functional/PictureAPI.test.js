import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dirtyChai from 'dirty-chai';
import shortid from 'shortid';
import Promise from 'bluebird';

chai.use(dirtyChai);
chai.use(chaiHttp);
const {expect} = chai;

const serverURL = `http://localhost:${3000}`;

describe('Test picture API', () => {

    afterEach((done) => {
        Promise
            .all([
                chai
                    .request(serverURL)
                    .delete('/api/mongo/clear')
                    .query({collection: 'pictures'}),
                chai
                    .request(serverURL)
                    .delete('/api/mongo/clear')
                    .query({collection: 'users'}),
                chai
                    .request(serverURL)
                    .delete('/api/redis/clear'),
            ])
            .then(() => {
                done();
            })
            .catch(done);

    });

    describe('#POST /api/picture/save', () => {

        it('should save image', (done) => {
            const nickname = shortid.generate();
            const email = shortid.generate() + '@gmail.com';
            const password = shortid.generate();
            const name = shortid.generate();
            const tag = shortid.generate();
            const description = shortid.generate();
            chai
                .request(serverURL)
                .post('/api/auth/registry')
                .send({nickname, email, password})
                .then((res) => {
                    return chai
                        .request(serverURL)
                        .post('/api/picture/save')
                        .set('authorization', res.body.accessToken)
                        .field('name', JSON.stringify(name))
                        .field('tags', JSON.stringify([tag]))
                        .field('description', JSON.stringify(description))
                        .field('isPrivate', JSON.stringify(true))
                        .attach('picture', fs.readFileSync('./packages/server/tests/functional/pictures/cat.jpg'), 'cat.jpg')
                })
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json();
                    expect(res.body).to.have.property('id').be.a('string');
                    expect(res.body).to.have.property('name', name).be.a('string');
                    expect(res.body).to.have.property('tags').be.a('array');
                    expect(res.body.tags).to.include(tag);
                    expect(res.body).to.have.property('description', description).be.a('string');
                    expect(res.body).to.have.property('url').be.a('string');
                    expect(res.body).to.have.property('likes', 0).be.a('number');
                    expect(res.body).to.have.property('isPrivate', true).be.a('boolean');
                    expect(res.body).to.have.property('uploadDate').be.a('string');
                    expect(res.body).to.have.property('owner').be.a('string');
                    done();
                })
                .catch((err)=>{
                    done(err);
                })
        });

    });


    describe('#GET /api/picture', () => {

        it('should find picture', (done) => {
            const nickname = shortid.generate();
            const email = shortid.generate() + '@gmail.com';
            const password = shortid.generate();
            const name = shortid.generate();
            const tag = shortid.generate();
            const description = shortid.generate();
            chai
                .request(serverURL)
                .post('/api/auth/registry')
                .send({nickname, email, password})
                .then((res) => {
                    return chai
                        .request(serverURL)
                        .post('/api/picture/save')
                        .set('authorization', res.body.accessToken)
                        .field('name', JSON.stringify(name))
                        .field('tags', JSON.stringify([tag]))
                        .field('description', JSON.stringify(description))
                        .field('isPrivate', JSON.stringify(true))
                        .attach('picture', fs.readFileSync('./packages/server/tests/functional/pictures/cat.jpg'), 'cat.jpg')
                        .then(()=>{
                            return chai
                                .request(serverURL)
                                .get('/api/picture')
                                .set('authorization', res.body.accessToken)
                        })
                })
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json();
                    expect(res.body).to.be.a('array').have.lengthOf(1);
                    expect(res.body[0]).to.have.property('id').be.a('string');
                    expect(res.body[0]).to.have.property('name', name).be.a('string');
                    expect(res.body[0]).to.have.property('tags').be.a('array');
                    expect(res.body[0].tags).to.include(tag);
                    expect(res.body[0]).to.have.property('description', description).be.a('string');
                    expect(res.body[0]).to.have.property('url').be.a('string');
                    expect(res.body[0]).to.have.property('likes', 0).be.a('number');
                    expect(res.body[0]).to.have.property('isPrivate', true).be.a('boolean');
                    expect(res.body[0]).to.have.property('uploadDate').be.a('string');
                    expect(res.body[0]).to.have.property('owner').be.a('string');
                    done();
                })
                .catch((err)=>{
                    done(err);
                })
        });

    });

});