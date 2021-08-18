const chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const userId = '611ca0828b1e4eade2f44b05';
const perofileId = '611cb5a795a4d0b45e16636c';
const ocupation = 'ocupation modified';

describe('HTTP Create Profile', function(){
    it('Should Create Profile', (done) => {
        chai.request('http://localhost:5000')
        .post('/profile/new')
        .send(
            {
                "userId" : userId,
                "firstname" : "Jhon",
                "lastname" : "Doe",
                "email" : "jdoe@gmail.com",
                "phone" : "3115550123",
                "ocupation"  : "Web Development"
            }
        )
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        // .set('Authorization', 'Bearer token')
        .end( function(err,res){
            console.log(res.body);
        expect(res).to.have.status(200);
            done();
        });
    });
});

describe('HTTP Get Profile By User', function(){
    it('Should Get Profile By User', (done) => {
        chai.request('http://localhost:5000')
        .get('/profile/get/'+userId)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        // .set('Authorization', 'Bearer token')
        .end( function(err,res){
            console.log(res.body);
        expect(res).to.have.status(200);
            done();
        });
    });
});

describe('HTTP Update Profile', function(){
    it('Should Update Profile', (done) => {
        chai.request('http://localhost:5000')
        .put('/profile/update')
        .send(
            {
                _id : perofileId,
                ocupation : ocupation
            }
        )
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        // .set('Authorization', 'Bearer token')
        .end( function(err,res){
            console.log(res.body);
        expect(res).to.have.status(200);
            done();
        });
    });
});