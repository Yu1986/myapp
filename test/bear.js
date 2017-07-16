process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var Bear = require('../app/models/bear');

chai.use(chaiHttp);

describe('Bear', function() {

	beforeEach((done) => { //Before each test we empty the database
		Bear.remove({}, (err) => { 
		   done();		   
		});		
	});

	describe('GET api/bears', function() {
		it('should be able to get all bears', function(done) {
			chai.request(server)
			.get('/api/bears')
		    .end( function(err, res) {
		    	console.log(res.body);
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
		        done();
		    });
		});
	});

	describe('POST api/bears', function() {
		it('should be able to create a bear', function(done) {
			var body = {
				"name": "testBear"
			}
			chai.request(server)
			.post('/api/bears')
			.send(body)
		    .end(function(err, res){
			  	res.should.have.status(200);
			  	res.body.message.should.equal('Bear created!');
		        done();
		    });
		});
	});

	describe('DELETE api/bears', function() {
		it('should be able to delete a bear', function(done) {
			var bear = new Bear();
			bear.name = "testBear";
			bear.save(function(req, err){
				chai.request(server)
				.delete('/api/bears/'+bear.id)
			    .end(function(err, res){
			  		res.should.have.status(200);
			  		res.body.message.should.equal('Successfully deleted');
		        	done();
		    	});
			})
		});
	});
});