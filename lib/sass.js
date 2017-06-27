var sass = require('node-sass')
var fs = require('fs')
var colors  = require('colors')
var time = require('../lib/timer.js')

var timelabel = "Processed sass".yellow

var CSSFile = "styles.css"
var SourceMap = "styles.css.map"

var ProcessSass = function()
{
  time(timelabel)
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
        console.log(timelabel+": "+time(timelabel))
      } else {
        console.log(error.message.red);
      }

  })
}

module.exports = ProcessSass
