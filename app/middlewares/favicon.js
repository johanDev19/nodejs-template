var favicon = require('serve-favicon'),
	path = require('path');

module.exports = favicon(path.join(__dirname, '../../public/favicon.ico'));