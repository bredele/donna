/**
 * Test dependencies.
 */

var assert = require('assert');
var donna = require('..');


describe('deep learning', function() {
	var bot;
	beforeEach(function() {
		bot = donna();
	});

	it('should classify short texts', function() {
		bot.train('it is cold', 'weather');
		bot.train('the day is sunny', 'weather');

		assert.equal(bot.guess('cold or sunny'), 'weather');

	});
});


describe('plugin', function() {
	var bot;
	beforeEach(function() {
		bot = donna();
	});

	it('should add donna trainings', function() {
		// this plugin add some trainings
		var plugin = function() {
			this.train('it is cold', 'weather');
			this.train('the sun is high but there is no cloud', 'weather');
		};

		bot.learn('weather', plugin);
		assert.equal(bot.guess('there is no sun'), 'weather');
	});

	it('should pass categorized sentence to the appropriate plugin', function(done) {
		var plugin = function() {
			return function(sentence) {
				console.log(sentence);
				if(sentence === 'there is no sun') done();
			};
		};

		bot.learn('weather', plugin);
		bot.train('hello', 'weather'); // one training is mandatory 
		bot.guess('there is no sun');
	})

});