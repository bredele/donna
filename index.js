
/**
 * Module dependencies.
 */

var classifier = require('classifier');
var tokenizer = require('tokenizer');


/**
 * Expose 'donna'
 */

module.exports = function() {

  var that = {};

  /**
   * Text classifier.
   */

  var language = classifier();


  /**
   * Plugins/category mapping.
   */

  var categories = {};


  /**
   * Classify sentence.
   *
   * @param {String} sentence
   * @param {String} category
   * @api public
   */

  that.train = function(sentence, category) {
  	language.train(tokenizer(sentence), category);
  	return that;
  };


  /**
   * Categorize sentence.
   *
   * @param {String} sentence
   * @api public
   */

  that.guess = function(sentence) {
  	var category = language.guess(sentence);
  	var cb = categories[category];
  	if(typeof cb === 'function') cb(sentence);
  	return category;
  };


  /**
   * Add learning plugin.
   *
   * @param {String} category
   * @param {Function} plugin
   * @api public
   */

  that.learn = function(category, plugin) {
  	categories[category] = plugin.call(that);
  	return that;
  };



  return that;

};