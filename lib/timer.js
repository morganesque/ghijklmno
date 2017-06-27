var moment = require('moment')
var human = require('humanize-duration')

var timers = {};

var time = function(label)
{
  if (timers[label] == undefined) timers[label] = [moment()]
  else
  {
    timers[label][1] = moment()
    var res = human(timers[label][1] - timers[label][0])
    delete timers[label]
    return res
  }
}

module.exports = time
