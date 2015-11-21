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