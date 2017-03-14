var nunj = require('nunjucks')
var moment = require('moment')

var env = new nunj.Environment(new nunj.FileSystemLoader('layouts'));
var nunjucksSafe = env.getFilter('safe');

env.addFilter("bob", function() {
  return 'bob';
});

env.addFilter('formatDate', function(str,format) {
    var d = moment(str).format(format);
    if (d !== 'Invalid date') return d;
    else return '';
});

env.addFilter('log', function log(a) {
	return nunjucksSafe('<script>console.log(' + JSON.stringify(a, null, '\t') + ');</script>');
});

module.exports = env;
