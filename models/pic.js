var mongoose = require('mongoose');
var Pic = require('../schemas/pic');

module.exports = mongoose.model('Pic', Pic);