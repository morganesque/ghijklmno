var fs       = require('fs')
var colors   = require('colors')
var moment   = require('moment')
var slugify  = require('slugify')
var prompt   = require('prompt')
var nunjucks = require('nunjucks')
var exec     = require('child_process').exec


prompt.colors = false
prompt.start()
prompt.get([{
  name: 'title',
  description: 'New post name',
  required: true,
  type: 'string'
}],function(err, result)
{
  var o = {};
  o.title = result.title
  o.slug = slugify(o.title).toLowerCase()
  o.date = moment().format('YYYY-MM-DD')

  var res = nunjucks.render("lib/newpost.md",result)
  var dest = "posts/"+o.date+'-'+o.slug+'.md'

  console.log('new post: '+dest.red)
  console.log(process.cwd())
  fs.writeFileSync(dest, res, "utf8")

  exec("atom-beta "+process.cwd()+"/"+dest,function(err,stdout,stderr)
  {
    if (err) console.log(err)
  });
})
