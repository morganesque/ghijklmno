var fs = require('fs')
var yml = require('yaml-front-matter')
var moment = require('moment')
var fn = require('filendir')
var path = require('path')
var _ = require('lodash')
var marked = require('marked')
var colors = require('colors')

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
    var filename = this.splitWithTail(postfile.split('.')[0],'-',3)
    page.filename = filename[3]
    page.url = '/'+page.filename+'/'
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
    console.time("site.posts".green);
    site.posts = [];
    _.each(posts,function(e,i){
      site.posts.push(_this.processPost(e))
    })
    site.posts = _.sortBy(site.posts,"dateorder").reverse()
    console.timeEnd("site.posts".green)
    return site;
  },

  writeArchivePage: function(site,env)
  {
    var timelabel = "archive".blue;
    console.time(timelabel)
    // create a destination filename
    var dest = "build/archive/index.html"
    // render the finished page in nunjucks.
    var res = env.render("archive.html",{"site":site})
    // write the finished page to a file.
    fn.writeFileSync(dest, res, "utf8")
    console.timeEnd(timelabel)
  },

  writePost: function(postfile,site,env)
  {
    // read _post
    var contents = fs.readFileSync("posts/"+postfile).toString()
    // parse yml front-matter
    var page = yml.loadFront(contents)
    // split the filename up
    var filename = this.splitWithTail(postfile.split('.')[0],'-',3)
    var timelabel = filename[3].green;
    console.time(timelabel);
    // convert the markdown and insert render in nunjucjs (this allows me to output nunjucks variables in the markdown file)
    page.content = env.renderString(marked(page["__content"]),{"page":page});
    // create a usable date from the filename.
    page.date = filename[0]+'-'+filename[1]+'-'+filename[2]

    var i = -1;
    _.each(site.posts, function(el,c) { if (el.date == page.date) { i = c; return false; }})

    page.previous = site.posts[i+1];
    page.next = site.posts[i-1];

    // create a destination filename to output the finished html page.
    page.dest = "build/"+filename[3]+"/index.html"
    // render the finished page in nunjucks.
    var res = env.render("post.html",{"page":page})
    // write the finished page to a file.
    fn.writeFileSync(page.dest, res, "utf8")
    console.timeEnd(timelabel);
  },

  allPosts: function(site,env)
  {
    var _this = this;
    var timelabel = "all.posts".red
    var posts = fs.readdirSync("posts")
    console.time(timelabel)
    _.each(posts,function(e,i){ _this.writePost(e,site,env) })
    console.timeEnd(timelabel)
  }

}

module.exports = utils;
