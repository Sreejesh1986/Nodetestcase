var nock = require('nock');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var healthcheck = require('../controllers/health.js');

describe('healthcheck test cases', function () {

    it('should return 200 ok', function () {
        var vow = nock('http://vow.com')
            .get('/')
            .reply(200, {
                status: 'OK',
                code: '200',
                Message: 'Success'
            });



    });

 var response={"status":"OK","code":"200","Message":"Success"};
 var healthresponse=healthcheck;
 return response.then(function(data){
 	var healthresponse=JSON.parse(data.healthcheck);
 	expect(healthresponse).to.deep.equal(response);
 });

});





