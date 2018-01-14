var mongoose = require('mongoose');
var Tab = require('../schemas/tab');

module.exports = mongoose.model('Tab', Tab);