var path = require('path')
var gaze = require('gaze')
var colors  = require('colors')
var env = require('./nunjucks.js')
var utils = require('./utils.js')
var sass = require('./sass.js')
var browserSync = require('browser-sync')

var site = {
  "name":"Ghijklmno - Tom Morgan  ",
}

site = utils.createSitePosts(site)

// utils.allPosts(site,env);
utils.writeFront("/homepage/"+site.latest.filename,site,env);
utils.writeArchivePage(site,env);

gaze('posts/*', function(err, watcher)
{
  this.on('changed',function(postfile)
  {
    console.log(path.basename(postfile).white + ' was changed'.green)
    utils.writePost(path.basename(postfile),site,env)
    utils.writeFront(postfile,site,env);
  })

  this.on('added',function(postfile)
  {
    console.log(path.basename(postfile).white + ' was added'.green)
    site = utils.createSitePosts(site)
    utils.writeArchivePage(site,env)
    utils.writeFront(postfile,site,env);
  })

  this.on('deleted',function(postfile)
  {
    console.log(path.basename(postfile).white + ' was deleted'.green)
    site = utils.createSitePosts(site)
    utils.writeArchivePage(site,env)
    utils.writeFront("/homepage/"+site.latest.filename,site,env)
  })

})

gaze('sass/*', function(err, watcher)
{
  this.on('all',function(postfile)
  {
    sass()
  })
})

browserSync({
    server: "build",
    files: ["build/**/*.html", "build/css/*.css"],
    logFileChanges: true,
    open: false,
    notify: false,
    reloadThrottle: 500
});
