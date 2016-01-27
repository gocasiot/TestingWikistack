var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;

var foo = 2+2;
describe('Simple Tests',function(){
	it('Performs basic math', function(){
		expect(foo).to.equal(4);
	});

	it('Confirms setTimeout\'s timer accuracy',function(done){
		var start = new Date(); 
		setTimeout(function(){
			var duration = new Date() - start;
			expect(duration).to.be.closeTo(1000, 10);
			done();
		},1000);
	});

	it('Use spy to confirm that forEach will invoke its function only once for every array element',function(){
		var arr = [1,2,3,4,5];
		function timesTwo(num){
			return num*2;
		}
		
		timesTwo = chai.spy(timesTwo);
		arr.forEach(timesTwo);
		expect(timesTwo).to.have.been.called.exactly(arr.length);
	});
});
