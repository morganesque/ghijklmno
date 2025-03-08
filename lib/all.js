var fs = require('fs')
var yml = require('yaml-front-matter')
var slugify = require('slugify')
var utils = require('./utils.js')
var colors = require('colors')
var moment = require('moment')
var env = require('./nunjucks.js')

/*
  Renews a post by renaming it to the current date

  Type: npm run all <name-of-post>

  NB. YOU HAVE TO BE IN THE /POSTS/ FOLDER
*/

// var postfile = process.argv[2]
// var contents = fs.readFileSync("posts/"+postfile).toString()
// var page = yml.loadFront(contents)
// var slug = slugify(page.title,{remove: /[*+~.()'"!:@]/g}).toLowerCase()

// console.log(slug)

// var year = moment().format("YYYY");
// var month = moment().format("MM");
// var day = moment().format("DD");

// var newfile = "posts/"+year+'-'+month+'-'+day+'-'+slug+'.md';
// fs.renameSync("posts/"+postfile,newfile)

var site = {
  "name":"Ghijklmno - Tom Morgan’s blog",
}

site = utils.createSitePosts(site)

utils.allPosts(site,env);