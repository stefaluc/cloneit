const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = chai.expect;

const baseUrl = 'http://localhost:8080/api';

chai.use(chaiHttp);

describe('API', () => {
    let topicId;
    // check that GET request succesfully sends all current topics
    it('GETs topics', (done) => {
        chai.request(baseUrl).get('/topics').end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('topics');
            done();
        });
    });

    // check that POST request succesfully adds new topic with title param
    it('POSTs topics', (done) => {
        chai.request(baseUrl).post('/topics').send({
            'title': 'test',
        }).end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('topics');
            const newTopic = res.body.topics[res.body.topics.length-1];
            expect(newTopic.title).to.equal('test');
            topicId = newTopic.id; // keep track of added topic
            done();
        });
    });

    // check that PATCH request succesfully upvotes topic
    it('PATCHs topics', (done) => {
        chai.request(baseUrl).patch('/topics/' + topicId).send({
            upvotes: 1,
        }).end((err, res) => {
            expect(res.body).to.have.property('topics');
            expect(res.body.topics[res.body.topics.length-1].upvotes).to.equal(1);
            done();
        });
    });

    // check that DELETE request succesfully deletes all topics
    it('DELETEs topics', (done) => {
        chai.request(baseUrl).delete('/topics').end((err, res) => {
            expect(res.body).to.have.property('topics');
            expect(res.body.topics.length).to.equal(0);
            done();
        });
    });
});
