# metalsmith-json-insteadof-md

[![metalsmith: plugin][metalsmith-badge]][metalsmith-url]

A Metalsmith plugin to use JSON files in addition to markdown files.

This plugin is based on [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown)

## Installation

```bash
$ npm install --save @boeckmt/metalsmith-json-insteadof-md
```

## Javascript Usage

 Pass `options` if needed to the plugin and pass it to Metalsmith with the `use` method:

options:
- fileExtnameFrom: <extname> //filter for all files with the extname - defaults '.json',
- fileExtnameTo: <extname> //replaces the file in the files Objext with the extname - defaults '.html',


```js
const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const jsonContent = require('metalsmith-json-insteadof-md'); // or import * as jsonContent from 'metalsmith-json-insteadof-md';

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


use the options whith `fileExtnameTo: '.md'` if you filter on the files later e.g.:

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

## Write the content

my-file.md

```md
  ---
  title: A Catchy Title
  draft: false
  ---

  An unfinished article...
```

writen in json:

```json
{
  "title": "A Catchy Title",
  "draft": false,
  "content": "<p></p>"
}
```

**The intention for this plugin was to use it with a json schema file and write the content with a IDE which supports json schema validation.**


## License

MIT

[npm-badge]: https://img.shields.io/npm/v/metalsmith-markdown.svg
[metalsmith-badge]: https://img.shields.io/badge/metalsmith-plugin-lightgrey.svg?longCache=true
[metalsmith-url]: http://metalsmith.io
