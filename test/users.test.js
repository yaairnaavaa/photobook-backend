const  appConfig  = require('../config');
const chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const newUsername = "testChai";
const newUsernameMod = "testModified";
const id = "5c802ade30e96e20f5fd6021";
const password = "123456";
const role = "user";

describe('HTTP Create User', function(){
    it('Should Insert A User', (done) => {
        chai.request('http://localhost:5000')
        .post('/user/new')
        .send(
            {
                _id : id,
                username : newUsername,
                password : password,
                role : role
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

describe('HTTP Get All Users', function(){
    it('Should Get All Users', (done) => {
        chai.request('http://localhost:5000')
        .get('/user/getAll')
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

describe('HTTP Update User', function(){
    it('Should Update A User', (done) => {
        chai.request('http://localhost:5000')
        .put('/user/update')
        .send(
            {
                _id : id,
                username : newUsernameMod,
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

describe('HTTP Get User By Username', function(){
    it('Should Get User By Username', (done) => {
        chai.request('http://localhost:5000')
        .get('/user/get/'+newUsernameMod)
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

describe('HTTP Delete User By Id', function(){
    it('Should Delete User By Id', (done) => {
        chai.request('http://localhost:5000')
        .delete('/user/delete/'+id)
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