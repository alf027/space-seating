/**
 * Created by Alfano on 7/9/15.
 */
var mustache = require('mustache'),
  fs = require('fs');

var view = {
  render: function(path, data) {
    var file = fs.readFileSync('./templates' + path + '.html');
    return mustache.render(file.toString(), data)
  }
};

module.exports = view;