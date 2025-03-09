const fs = require('fs');
var colors = require('colors')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

/**
 * Searches for files in a given directory that contain the search term.
 * @param {string} searchTerm - The string to search for in filenames.
 * @param {string} directory - The directory to search within.
 * @returns {Promise<string>} - The selected filename.
 */
const findFile = async (searchTerm, directory) => {
  if (!searchTerm) {
    throw new Error('Search term is required.');
  }

  // Read directory contents
  const files = fs.readdirSync(directory);
  const matches = files.filter(file => file.includes(searchTerm));

  if (matches.length === 0) {
    throw new Error('No matching files found.');
  } else if (matches.length === 1) {
    const confirm = await askQuestion(`Found one file: ${matches[0].yellow}. Is this the correct file? (y/n) `);
    if (confirm.toLowerCase() !== 'y') {
      throw new Error('Operation cancelled.');
    }
    rl.close();
    return matches[0];
  } else {
    console.log('Multiple matching files found:');
    matches.forEach((file, index) => console.log(`${index + 1}. ${file}`));

    let selectedFile;
    while (!selectedFile) {
      const choice = await askQuestion('Enter the number of the correct file: ');
      const index = parseInt(choice, 10) - 1;
      if (!isNaN(index) && matches[index]) {
        selectedFile = matches[index];
      } else {
        console.log('Invalid selection. Try again.');
      }
    }

    rl.close();
    return selectedFile;
  }
};

module.exports = { findFile };
