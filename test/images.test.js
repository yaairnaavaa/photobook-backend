const chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const path = require('path');

const userId = '5c802ade30e96e20f5fd6021';
const imageId = '611a26791f799c4c12b0ade5';

describe('HTTP Upload Image', function(){
    it('Should Upload Image', (done) => {
        chai.request('http://localhost:5000')
        .post('/image/saveImage')
        .attach('image',path.join(__dirname, '../public/img/uploads/test.png'), 'test.png')
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

describe('HTTP Get All Images', function(){
    it('Should Get All Images', (done) => {
        chai.request('http://localhost:5000')
        .get('/image/getImages')
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

describe('HTTP Get User Images', function(){
    it('Should Get User Images', (done) => {
        chai.request('http://localhost:5000')
        .get('/image/getUserImages/'+userId)
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

describe('HTTP Get Image By Id', function(){
    it('Should Get Image By Id', (done) => {
        chai.request('http://localhost:5000')
        .get('/image/getImage/'+imageId)
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