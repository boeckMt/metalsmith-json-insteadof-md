var DEBUG = require('debug')('metalsmith-json-insteadof-md');
var PATH = require('path');

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */
var isJson = function(file) {
  return /\.json$/.test(PATH.extname(file));
};

/**
 *
 * @param {String} rawfile
 * @return {Object} {content: String, header: Object}
 */
function convertToJson(rawfile) {
  var file = rawfile.contents.toString('utf8');
  var jsonFile = JSON.parse(file);
  var content = (jsonFile.content)? jsonFile.content: '';
  delete jsonFile.content;
  var header = jsonFile;
  return { content: content.trim(), header: header };
}

/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */
var plugin = function(options) {
  var _options = {
    fileExtnameFrom: '.json',
    fileExtnameTo: '.html'
  };
  if (options) {
    _options = {
      fileExtnameFrom: options.fileExtnameFrom || '.json',
      fileExtnameTo: options.fileExtnameTo || '.html'
    };
  }

  return function(files, metalsmith, done) {
    setImmediate(done);
    for (var path in files) {
      DEBUG('checking file: %s', path);
      if (isJson(path)) {
        var data = files[path];
        DEBUG('converting file: %s', path);
        var newfile = convertToJson(data);
        var htmlpath = path.replace(_options.fileExtnameFrom, _options.fileExtnameTo);
        try {
          // preferred
          data.contents = Buffer.from(newfile.content);
        } catch (err) {
          // node versions < (5.10 | 6)
          data.contents = new Buffer(newfile.content);
        }
        data = Object.assign(data, newfile.header);
        delete files[path];
        files[htmlpath] = data;
      }
    }
    return files;
  };
};

// Expose Plugin
module.exports = plugin;
