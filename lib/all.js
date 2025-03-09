var fs = require('fs')
var yml = require('yaml-front-matter')
var slugify = require('slugify')
var utils = require('./utils.js')
var colors = require('colors')
var moment = require('moment')
var env = require('./nunjucks.js')

var site = {
  "name":"Ghijklmno - Tom Morgan’s blog",
}

site = utils.createSitePosts(site)

utils.allPosts(site,env);