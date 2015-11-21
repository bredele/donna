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
	var bot, plugin;
	beforeEach(function() {
		bot = donna();
		plugin = function() {
			this.train('it is cold', 'weather');
			this.train('the sun is high but there is no cloud', 'weather');
		};
	});

	it('should add donna trainings', function() {
		bot.learn('weather', plugin);
		assert.equal(bot.guess('there is no sun'), 'weather');
	});
});