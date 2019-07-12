# metalsmith-json-insteadof-md

[![metalsmith: core plugin][metalsmith-badge]][metalsmith-url]

[![Known Vulnerabilities][snyk-badge]][synk-url]

A Metalsmith plugin to use JSON files in addition to markdown files.

This plugin is based on [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown)

## Installation

```bash
$ npm install metalsmith-json-insteadof-md
```

## Javascript Usage

 Pass `options` if needed to the plugin and pass it to Metalsmith with the `use` method:

options:
- fileExtnameFrom: <extname> //filter for all files with the extname - defaults '.json',
- fileExtnameTo: <extname> //replaces the file in the files Objext with the extname - defaults '.html',


```js
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var jsonContent = require('metalsmith-json-insteadof-md');

Metalsmith(__dirname)
    .source('./source/')
    .destination('./dist/build/')
    .use(jsonContent())
    .use(markdown())
    .build((err, files) => {
      console.log(`new Build completed!`);
      if (err) {
        console.log(err);
      }
    });
```


use the options if you filter on the files later e.g.:

```js
Metalsmith(__dirname)
    .source('./source/')
    .destination('./dist/build/')
    .use(jsonContent({
      fileExtnameTo: '.md'
    }))
    .use(markdown())
    .use(collections({
      items: {
        pattern: ['*/data/items/**/*.md']
      }
    }))
    .build((err, files) => {
      console.log(`new Build completed!`);
      if (err) {
        console.log(err);
      }
    });
```


## License

MIT

[npm-badge]: https://img.shields.io/npm/v/metalsmith-markdown.svg
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?longCache=true
[prettier-url]: https://github.com/prettier/prettier
[metalsmith-badge]: https://img.shields.io/badge/metalsmith-core_plugin-green.svg?longCache=true
[metalsmith-url]: http://metalsmith.io
