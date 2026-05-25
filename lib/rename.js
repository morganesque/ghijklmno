var fs = require('fs')
var yml = require('yaml-front-matter')
var slugify = require('slugify')
var utils = require('./utils.js')
var colors = require('colors')
const { findFile } = require('./fileSelector');

/*
  Renames an existing post by taking the name you've put
  in the page.title (in the yml) and slugifying it.

  FIRST -> Update the YML with a new page title

  usage: npm run rename <word in filename>
*/

(async () => {
  try {
      const searchTerm = process.argv[2];
      const directory = './posts'; 
      const selectedFile = await findFile(searchTerm, directory);

      console.log(`Final selected file: ${selectedFile}`);
      reNameFile(selectedFile);

  } catch (error) {
      console.error(error.message);
      process.exit(1);
  }
})();

function reNameFile(postfile)
{
  var contents = fs.readFileSync("posts/" + postfile).toString()
  var page = yml.loadFront(contents)
  var slug = slugify(page.title, { remove: /[*+~.()'"!:@]/g }).toLowerCase()

  var filename = utils.splitWithTail(postfile.substr(0, postfile.lastIndexOf('.')), '-', 3)
  var date = filename[0] + '-' + filename[1] + '-' + filename[2]
  var dest = "posts/" + date + '-' + slug + '.md'
  var oldslug = filename[3];

  if (dest !== "posts/" + postfile) {
    fs.writeFileSync(dest, contents, "utf8")
    fs.unlinkSync("posts/" + postfile)
    if (oldslug) fs.rmSync("build/" + oldslug, { recursive: true, force: true })
    console.log(dest.green)
  } else {
    console.log("Same name, not doing!".red)
  }
}