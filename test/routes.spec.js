var supertest = require('supertest-promised');
var app = require('../app');
var agent = supertest.agent(app);

var chai = require('chai');
var expect = chai.expect;


var Page = require('../models').Page;

describe('http requests', function() {

    describe('GET /', function() {
        it('gets 200', function() {
        	return agent
		        	.get('/')
		        	.expect(200)
        });
    });

    describe('GET /wiki/add', function () {
        it('gets 200', function () {
        	return agent
		        	.get('/wiki/add')
		        	.expect(200)
        });
    });

    beforeEach(function() {
    	return Page.create({
				title: 'Page1 Title',
				content: 'Page 1 content',
				status: 'open',
				tags: ['Hello','World']
			});
    });

    afterEach(function(){
    	return Page.remove({});
    });



    describe('GET /wiki/:urlTitle', function() {
        it('gets 404 on page that doesnt exist', function() {
        	return agent
		        	.get('/wiki/Page2_Title')
		        	.expect(404);
        });
        it('gets 200 on page that does exist', function() {
        	return agent
		        	.get('/wiki/Page1_Title')
		        	.expect(200);
        });
    });

    describe('GET /wiki/search', function() {
        it('gets 200', function() {
        	return agent
		        	.get('/wiki/search?tag=Hello')
		        	.expect(200)
        });
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        it('gets 404 for page that doesn\'t exist', function() {
        	return agent
		        	.get('/wiki/Page2_Title/similar')
		        	.expect(404);
        });
        it('gets 200 for similar page', function() {
        	return agent
		        	.get('/wiki/Page1_Title/similar')
		        	.expect(200);
        });
    });


    describe('POST /wiki/add', function() {
        it('creates a page in db', function(done) {
        	// return agent
		       //  	.post('/wiki')
		       //  	.send({name: "Gustavo", 
		       //  		email: "test@test", 
		       //  		title: "New Title",
		       //  		content: "Hello",
		       //  		status: "open",
		       //  		tags: "1,2,3,4,5"
		       //  	})
		       //  	.expect(302, function(){console.log("im in here");})
		       //  	.then(function(what){
		       //  		// console.log("this is what",what);
		       //  		return Page.findOne({title: "New Title"}).exec();
		       //  	})
	        // 		// .then(function(page){
	        // 		// 	console.log(page);
	        // 		// 	expect(page).to.not.equal(null);
	        // 		// 	expect(page.title).to.equal("New Title");
	        			
	        // 		// })
	    
			
			agent
        	.post('/wiki')
        	.send({name: "Gustavo", 
        		email: "test@test", 
        		title: "New Title",
        		content: "Hello",
        		status: "open",
        		tags: "1,2,3,4,5"
        	})
        	.expect(302, function(){
				Page.findOne({title: "New Title"}).exec()
				.then(function(page){
					expect(page).to.not.equal(null);
					expect(page.title).to.equal("New Title");
					done();
				})
				.then(null,done);
        	});
        	

	    
	        		
        });
    });

});

