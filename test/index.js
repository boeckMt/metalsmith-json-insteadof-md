/* eslint-env mocha */

var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var jsonContent = require('..');

describe('metalsmith-json-insteadof-md', function() {
  it('should convert json files', function(done) {
    Metalsmith('test/fixtures/basic')
      .use(jsonContent())
      .build(function(err) {
        if (err) return done(err);
        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');
        done();
      });
  });

  it('should allow a "keys" option', function(done) {
    Metalsmith('test/fixtures/keys')
      .use(jsonContent())
      .build(function(err, files) {
        if (err) return done(err);
        assert.equal('A Title for the JSON Post', files['index.html'].titel);
        done();
      });
  });

  it('should allow zu use it with metalsmith-markdown', function(done) {
    Metalsmith('test/fixtures/withmarkdown')
      .use(
        jsonContent({
          fileExtnameTo: '.md'
        })
      )
      .use(markdown())
      .build(function(err, files) {
        if (err) return done(err);
        assert.equal('A Title for the JSON Post', files['index.html'].titel);
        done();
      });
  });
});
