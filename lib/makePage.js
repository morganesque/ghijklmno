var path = require('path')
var gaze = require('gaze')
var colors  = require('colors')
var env = require('./nunjucks.js')
var utils = require('./utils.js')

var site = {
  "name":"Ghijklmno - Tom Morgan",
}

var pageName = process.argv[2];
console.log(path.basename(pageName).white + ' being rebuilt'.green)

utils.writePage(path.basename(pageName)+'.md',site,env)
