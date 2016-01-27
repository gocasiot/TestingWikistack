// Organize in separate pages
// Setup test database (?)


// Test pages
// 1. Validation testing: 
// - Create and fetch new wiki page
// - Create new wiki page with wrong inputs to test validation
// 2. Test the following:
// - virtuals
// - hooks
// - statics
// - methods


// Test users
// 1. Validation testing:
// - Add and fetch new user
// - Add users with repeated emails (each email should be unique)
// 2. Test the following:
// - virtuals
// - hooks
// - statics
// - methods
// 


// System testing integration/interaction of users and pages
// 1. Create pages with new users. Can pages reference users correctly?

var chai = require('chai');
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;

var Page = require('../models').Page;

describe('Page model', function() {

    describe('Validations', function() {

    	var testPage;

    	beforeEach(function() {
    		testPage = new Page();
    	})

		it('errors without title', function() {
		    testPage.validate(function(err) {
		        expect(err.errors).to.have.property('title');

		    });
		});
		
		it('errors without content', function() {
		    testPage.validate(function(err) {
		        expect(err.errors).to.have.property('content');
		    });
		});

		it('errors for wrong status', function() {
		    testPage.status = 'I love NYC';
		    testPage.validate(function(err) {
		        expect(err.errors).to.have.property('status');
		    });
		});

    });

    describe('Statics', function() {

    	var testPage;
    	beforeEach(function(){
    		testPage = new Page({
    			title: 'Page Title',
    			content: 'The content of the page',
    			status: 'open',
    			tags: ['Fullstack', 'Academy']
    		});
    		return testPage.save();
    	});

    	afterEach(function(done) {
    		Page.remove({}, done);
    	})

        describe('findByTag', function() {
            it('gets pages with the search tag', function(done) {

            	Page.findByTag('Fullstack').then(function(page){
            		expect(page[0].title).to.equal(testPage.title);
            		done()
            	}, done);

            });

            it("does not get pages with a tag that doesn't exit", function(done) {

            	Page.findByTag('Patrick').then(function(page){
					expect(page.length).to.equal(0);
            		done()
            	}, done);
            });
        });
    });

    describe('Methods', function() {
    	var page1;
        beforeEach(function(done){
        	page1 = new Page({
        		title: 'Page1 Title',
        		content: 'Page 1 content',
        		status: 'open',
        		tags: ['Hello','World']
        	});
        	var page2 = new Page({
        		title: 'Page2 Title',
        		content: 'Page 2 content',
        		status: 'open',
        		tags: ['Hello','World']
        	});
        	var page3 = new Page({
        		title: 'Page3 Title',
        		content: 'Page 3 content',
        		status: 'open',
        		tags: ['NYC','Boston']
        	});

        	var pageArray = [page1.save(), page2.save(), page3.save()];

        	Promise.all(pageArray)
        	.then(function(){
        		done();
        	})
        	.then(null, done);

        });

        afterEach(function(done) {
    		Page.remove({}, done);
    	})

        describe('findSimilar', function() {
            it('never gets itself', function(done) {
            	page1.findSimilar()
            	.then(function(pages) {         	
            		pages.should.not.contain.a.thing.with.property('title', "Page1 Title");
            		done();
            	}).then(null,done);
            });

            it('gets other pages with any common tags', function(done) {
            	page1.findSimilar()
            	.then(function(pages) {
            		pages.should.contain.a.thing.with.property('title', 'Page2 Title');
            		done();
            	}).then(null,done);
            });
            it('does not get other pages without any common tags', function(done) {
            	page1.findSimilar()
            	.then(function(pages) {
            		pages.should.not.contain.a.thing.with.property('title', 'Page3 Title');
            		done();
            	}).then(null,done);
            });
        });
    });

    describe('Virtuals', function() {

    	var testPage;
    	beforeEach(function() {
    		testPage = new Page({
        		title: 'Page1 Title',
        		urlTitle: 'Page1_Title',
        		content: 'Page 1 content',
        		status: 'open',
        		tags: ['Hello','World']
        	});
    	});

        describe('route', function() {
            it('returns the url_name prepended by "/wiki/"', function() {
            	expect(testPage.route).to.equal('/wiki/' + testPage.urlTitle);
            });
        });

        describe('rendered Content', function() {
            xit('returns content written in markdown converted to html', function() {});
        });
    });

    describe('Hooks', function() {
        var testPage;
    	beforeEach(function() {
    		testPage = new Page({
        		title: 'Page1 Title',
        		content: 'Page 1 content',
        		status: 'open',
        		tags: ['Hello','World']
        	});
    	});


        it('it sets urlTitle based on title before validating', function() {
        	expect(testPage.urlTitle).to.be.equal(undefined);
        	testPage.validate();
        	expect(testPage.urlTitle).to.be.equal('Page1_Title');

        });
    });

});














