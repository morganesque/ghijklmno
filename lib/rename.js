var fs = require('fs')
var yml = require('yaml-front-matter')
var slugify  = require('slugify')
var utils = require('./utils.js')
var colors   = require('colors')

/*
  Renames an existing post by taking the name you've put
  in the page.title (in the yml) and slugifying it.

  1. Update the YML with a new page title
  2. Type: npm run rename <name-of-post-to-rename>

  NB. YOU HAVE TO BE IN THE /POSTS/ FOLDER
*/

var postfile = process.argv[2]
var contents = fs.readFileSync("posts/"+postfile).toString()
var page = yml.loadFront(contents)
var slug = slugify(page.title,{remove: /[*+~.()'"!:@]/g}).toLowerCase()

var filename = utils.splitWithTail(postfile.substr(0,postfile.lastIndexOf('.')),'-',3)
var date = filename[0]+'-'+filename[1]+'-'+filename[2]
var dest = "posts/"+date+'-'+slug+'.md'
var oldslug = filename[3];

if (dest !== "posts/"+postfile)
{
  fs.writeFileSync(dest, contents, "utf8")
  fs.unlinkSync("posts/" + postfile)
  if (oldslug) fs.rmSync("build/" + oldslug,{ recursive: true, force: true })
  console.log(dest.green)
} else {
  console.log("Same name, not doing!".red)
}

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
