var colors = require("colors");
var env = require("./nunjucks.js");
var utils = require("./utils.js");
const { findFile } = require("./fileSelector");

/*
  Rebuilds a selected post and its immediate timeline neighbors
  so previous/next links stay in sync.

  usage: npm run relink <word in filename>
*/

(async () => {
  try {
    const searchTerm = process.argv[2];
    const directory = "./posts";
    const selectedFile = await findFile(searchTerm, directory);

    console.log(`Final selected file: ${selectedFile}`);
    relinkNeighbors(selectedFile);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();

function relinkNeighbors(postfile) {
  var site = {
    name: "Ghijklmno - Tom Morgan's blog",
  };

  site = utils.createSitePosts(site);

  var index = site.posts.findIndex(function (post) {
    return post.filename === postfile;
  });

  if (index === -1) {
    console.log(("Could not find " + postfile + " in site timeline.").red);
    process.exit(1);
  }

  var filesToRebuild = [
    site.posts[index - 1] && site.posts[index - 1].filename,
    site.posts[index] && site.posts[index].filename,
    site.posts[index + 1] && site.posts[index + 1].filename,
  ].filter(Boolean);

  console.log("Rebuilding timeline links for:".green);
  filesToRebuild.forEach(function (file) {
    console.log((" - " + file).yellow);
    utils.writePost(file, site, env);
  });

  utils.writeArchivePage(site, env);
  utils.writeFront("/homepage/" + site.latest.filename, site, env);

  console.log("Timeline neighbor relink complete.".green);
}
