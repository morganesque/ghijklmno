var fs = require('fs')
var yml = require('yaml-front-matter')
var slugify = require('slugify')
var colors = require('colors')
const readline = require('readline');
const { findFile } = require('./fileSelector');

/*
  Changes the date a post was written by asking you for the new date.

  usage: npm run renew <word in filename>
 */

(async () => {
  try {
    const searchTerm = process.argv[2];
    const directory = './posts';
    const selectedFile = await findFile(searchTerm, directory);

    console.log(`Final selected file: ${selectedFile}`);
    reDateFile(selectedFile);

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();

function reDateFile(postfile) {

  console.log(`Redating: ${postfile}`);

  var contents = fs.readFileSync("posts/" + postfile).toString()
  var page = yml.loadFront(contents)
  var slug = slugify(page.title, { remove: /[*+~.()'"!:@]/g }).toLowerCase()

  console.log("slug", slug);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askQuestion = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
  };

  (async () => {
    const year = await askQuestion('Enter a year: ');
    const month = await askQuestion('Enter a month (1-12): ');
    const day = await askQuestion('Enter a day (1-31): ');

    rl.close();

    var newfile = "posts/" + year + '-' + month.padStart(2, '0') + '-' + day + '-' + slug + '.md';
    fs.renameSync("posts/" + postfile, newfile)

    console.log(`You entered: ${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    console.log("newfile", newfile.green);

  })();
}

