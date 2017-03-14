var sass = require('node-sass')
var fs = require('fs')
var colors  = require('colors')

var timelabel = "Processed sass".yellow
console.time(timelabel)

var CSSFile = "styles.css"
var SourceMap = "styles.css.map"

var ProcessSass = function()
{
  sass.render({
    file: "sass/styles.scss",
    // includePaths: ["bower_components"],
    outputStyle: "compressed",
    sourceMap: SourceMap,
    outFile: CSSFile,
    }, function(error, result) {
      if (!error) {
        // No errors during the compilation, write this result on the disk
        fs.writeFileSync("build/css/"+CSSFile, result.css);
        fs.writeFileSync("build/css/"+SourceMap, result.map);
        console.timeEnd(timelabel)
      } else {
        console.log(error.message.red);
      }

  })
}

module.exports = ProcessSass
