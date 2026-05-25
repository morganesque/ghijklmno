var fs = require('fs')
var yml = require('yaml-front-matter')
var slugify = require('slugify')
var colors = require('colors')
const { findFile } = require('./fileSelector');

/*
  Renews a post by renaming it to the current date

  usage: npm run renew <word in filename>
*/

(async () => {
  try {
      const searchTerm = process.argv[2];
      const directory = './posts'; // Change to your directory
      const selectedFile = await findFile(searchTerm, directory);

      console.log(`Final selected file: ${selectedFile}`);
      // You can now use `selectedFile` for further processing
      reNewFile(selectedFile);

  } catch (error) {
      console.error(error.message);
      process.exit(1);
  }
})();

function reNewFile(postfile)
{
  var contents = fs.readFileSync("posts/"+postfile).toString()
  var page = yml.loadFront(contents)
  var slug = slugify(page.title,{remove: /[*+~.()'"!:@]/g}).toLowerCase()
  
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
  const day = String(now.getDate()).padStart(2, '0');
  
  var newfile = "posts/" + year + '-' + month + '-' + day + '-' + slug + '.md';
  console.log("newfile",newfile.green);
  fs.renameSync("posts/"+postfile,newfile)
}
