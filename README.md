# node-bunyan-stream [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Stream data into a [bunyan][12] logger. Allows fine grained control over what
is logged from a stream.

## Installation
```sh
$ npm install bunyan-stream
```

## Usage
```js
const bunyanStream = require('bunyan-stream')
const httpNdjson = require('http-ndjson')
const bunyan = require('bunyan')

const logger = bunyan.createLogger({ name: 'myApp' })

http.createServer((req, res) => {
  httpNdjson(req, res).pipe(bunyanStream({ level: 'info' }, logger))
  res.end()
}).listen()
```

## API
### bunyanStream
Create a new [bunyan][12] writestream (`instanceof through2`). `opts` can
contain the following values:
- __level__: the log level. One of `debug`, `info`, `warn`, `error`

## See Also
- [http-ndjson](https://github.com/TabDigital/http-ndjson)
- [server-summary](https://github.com/TabDigital/server-summary)
- [bole-stream](https://github.com/yoshuawuyts/bole-stream)
- [bunyan][12]

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/bunyan-stream.svg?style=flat-square
[3]: https://npmjs.org/package/bunyan-stream
[4]: https://img.shields.io/travis/TabDigital/node-bunyan-stream/master.svg?style=flat-square
[5]: https://travis-ci.org/TabDigital/node-bunyan-stream
[6]: https://img.shields.io/codecov/c/github/TabDigital/node-bunyan-stream/master.svg?style=flat-square
[7]: https://codecov.io/github/TabDigital/node-bunyan-stream
[8]: http://img.shields.io/npm/dm/bunyan-stream.svg?style=flat-square
[9]: https://npmjs.org/package/bunyan-stream
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[12]: https://github.com/trentm/node-bunyan
