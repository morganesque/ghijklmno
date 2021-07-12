var fs = require('fs')
var yml = require('yaml-front-matter')
var moment = require('moment')
var fn = require('filendir')
var path = require('path')
var _ = require('lodash')
var marked = require('marked')
var colors = require('colors')
var time = require('../lib/timer.js')

var pre = "[sta".white+"t".cyan+"om".blue+"ic".white+'] - '

var utils = {

  splitWithTail: function(str,delim,count){
    // split the string on the delimiter
    var parts = str.split(delim);
    // take the end of the array out and joinit.
    var tail = parts.slice(count).join(delim);
    // grab the first bit of the array as is.
    var result = parts.slice(0,count);
    // stick the joined end back in.
    result.push(tail);
    return result;
  },

  processPost: function(postfile)
  {
    // read _post
    var contents = fs.readFileSync("posts/"+postfile).toString()
    // parse yml front-matter
    var page = yml.loadFront(contents)
    // split the filename up
    var filename = this.splitWithTail(postfile.substr(0,postfile.lastIndexOf('.')),'-',3)
    page.filename = postfile;
    page.url = '/'+filename[3]+'/'
    // create a usable date from the filename.
    page.date = filename[0]+'-'+filename[1]+'-'+filename[2]
    page.year = filename[0]
    page.dateorder = moment(filename[0]+'-'+filename[1]+'-'+filename[2])
    // delete(page["__content"]);
    return page;
  },

  createSitePosts: function(site)
  {
    var _this = this;
    var posts = fs.readdirSync("posts")
    var timelabel = pre+"listing posts".green;
    time(timelabel);
    site.posts = [];
    _.each(posts,function(e,i){
      site.posts.push(_this.processPost(e))
    })
    site.posts = _.sortBy(site.posts,"dateorder").reverse()
    console.log(timelabel+": "+time(timelabel))
    site.latest = site.posts[0];
    site.prev = site.posts[1];
    return site;
  },

  writeArchivePage: function(site,env)
  {
    var timelabel = pre + "creating archive".green;
    time(timelabel)
    // create a destination filename
    var dest = "build/archive/index.html"
    // render the finished page in nunjucks.
    var res = env.render("archive.html",{"site":site,"archive":true})
    // write the finished page to a file.
    fn.writeFileSync(dest, res, "utf8")
    console.log(timelabel+": "+time(timelabel))
  },

  writeFront(postfile,site,env)
  {
    if (path.basename(postfile) == site.latest.filename) {
      this.writePost(site.latest.filename, site, env, true);
      this.writePost(site.prev.filename, site, env);
    }
  },

  writePage: function(pagefile,site,env,index)
  {
    // read _post
    var contents = fs.readFileSync("pages/"+pagefile).toString()
    // parse yml front-matter
    var pageData = yml.loadFront(contents)
    // split the filename up
    var filename = pagefile.split('.')[0]
    var timelabel = (index) ? pre + "creating front page".green : pre + filename.green;
    time(timelabel);
    // convert the markdown and insert render in nunjucjs (this allows me to output nunjucks variables in the markdown file)
    pageData.content = env.renderString(marked(pageData["__content"]),{"page":pageData,"site":site});
    pageData.dest = "build/"+filename+"/index.html"
    // render the finished page in nunjucks.
    var res = env.render("page.html",{"page":pageData,"site":site})
    // write the finished page to a file.
    fn.writeFileSync(pageData.dest, res, "utf8")
    console.log(timelabel+": "+time(timelabel));
  },

  writePost: function(postfile,site,env,index)
  {
    // read _post
    var contents = fs.readFileSync("posts/"+postfile).toString()
    // parse yml front-matter
    var page = yml.loadFront(contents)
    // split the filename up
    var filename = this.splitWithTail(postfile.substr(0,postfile.lastIndexOf('.')),'-',3)
    var timelabel = (index) ? pre + "creating front page".green : pre + filename[3].green;
    time(timelabel);
    // convert the markdown and insert render in nunjucjs (this allows me to output nunjucks variables in the markdown file)
    page.content = env.renderString(marked(page["__content"]),{"page":page,"site":site});
    // create a usable date from the filename.
    page.date = filename[0]+'-'+filename[1]+'-'+filename[2]

    var i = -1;
    _.each(site.posts, function(el,c) { if (el.date == page.date) { i = c; return false; }})

    page.previous = site.posts[i+1];
    page.next = site.posts[i-1];

    // create a destination filename to output the finished html page.
    if (index) page.dest = "build/index.html"
    else page.dest = "build/"+filename[3]+"/index.html"
    // render the finished page in nunjucks.
    var res = env.render("post.html",{"page":page,"site":site,"index":index})
    // write the finished page to a file.
    fn.writeFileSync(page.dest, res, "utf8")
    console.log(timelabel+": "+time(timelabel));
  },

  allPosts: function(site,env)
  {
    var _this = this;
    var timelabel = pre + "recreating all posts".red
    var posts = fs.readdirSync("posts")
    time(timelabel)
    _.each(posts,function(e,i){ _this.writePost(e,site,env) })
    console.log(timelabel+": "+time(timelabel))
  }

}

module.exports = utils;
