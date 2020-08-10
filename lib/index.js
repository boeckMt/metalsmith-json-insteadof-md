const DEBUG = require('debug')('metalsmith-json-insteadof-md');
const PATH = require('path');

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */
const isJson = function (file) {
  return /\.json$/.test(PATH.extname(file));
};

/**
 *
 * @param {*} rawfile
 * @return {Object} {content: String, header: Object}
 */
function convertToJson(rawfile) {
  const file = rawfile.contents.toString('utf8');
  const jsonFile = JSON.parse(file);
  const content = jsonFile.content ? jsonFile.content : '';
  delete jsonFile.content;
  const header = jsonFile;
  return { content: content.trim(), header: header };
}

/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */
const plugin = function (options) {
  let _options = {
    fileExtnameFrom: '.json',
    fileExtnameTo: '.html',
  };
  if (options) {
    _options = {
      fileExtnameFrom: options.fileExtnameFrom || '.json',
      fileExtnameTo: options.fileExtnameTo || '.html',
    };
  }

  return function (files, metalsmith, done) {
    setImmediate(done);
    for (const path in files) {
      DEBUG('checking file: %s', path);
      if (isJson(path)) {
        let data = files[path];
        DEBUG('converting file: %s', path);
        const newfile = convertToJson(data);
        const htmlpath = path.replace(_options.fileExtnameFrom, _options.fileExtnameTo);
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
