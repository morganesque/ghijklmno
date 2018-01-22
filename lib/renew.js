var fs = require('fs')
var yml = require('yaml-front-matter')
var slugify = require('slugify')
var utils = require('./utils.js')
var colors = require('colors')
var moment = require('moment')

/*
  Renews a post by renaming it to the current date

  Type: npm run renew <name-of-post>

  NB. YOU HAVE TO BE IN THE /POSTS/ FOLDER
*/

var postfile = process.argv[2]
var contents = fs.readFileSync("posts/"+postfile).toString()
var page = yml.loadFront(contents)
var slug = slugify(page.title).toLowerCase()

console.log(slug)

var year = moment().format("YYYY");
var month = moment().format("MM");
var day = moment().format("DD");

var newfile = "posts/"+year+'-'+month+'-'+day+'-'+slug+'.md';

fs.renameSync("posts/"+postfile,newfile)
//
// var filename = utils.splitWithTail(postfile.split('.')[0],'-',3)
// var date = filename[0]+'-'+filename[1]+'-'+filename[2]
// var dest = "posts/"+date+'-'+slug+'.md'
//
// if (dest !== "posts/"+postfile)
// {
//   fs.writeFileSync(dest, contents, "utf8")
//   fs.unlinkSync("posts/"+postfile)
//   console.log(dest.green)
// } else {
//   console.log("Same name, not doing!".red)
// }

//
// var colors   = require('colors')
// var moment   = require('moment')
// var slugify  = require('slugify')
// var prompt   = require('prompt')
// var nunjucks = require('nunjucks')
// var exec     = require('child_process').exec
//
//
// prompt.colors = false
// prompt.start()
// prompt.get([{
//   name: 'title',
//   description: 'New post name',
//   required: true,
//   type: 'string'
// }],function(err, result)
// {
//   var o = {};
//   o.title = result.title
//   o.slug = slugify(o.title).toLowerCase()
//   o.date = moment().format('YYYY-MM-DD')
//
//   var res = nunjucks.render("lib/newpost.md",result)
//   var dest = "posts/"+o.date+'-'+o.slug+'.md'
//
//   console.log('new post: '+dest.red)
//   console.log(process.cwd())
//   fs.writeFileSync(dest, res, "utf8")
//
//   exec("atom-beta "+process.cwd()+"/"+dest,function(err,stdout,stderr)
//   {
//     if (err) console.log(err)
//   });
// })
