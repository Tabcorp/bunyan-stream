const through = require('through2')
const json = require('JSONStream')
const assert = require('assert')
const pump = require('pump')

module.exports = boleStream

// Stream data into a bole logger
// (obj?, fn) -> wstream
function boleStream (opts, logger) {
  if (!logger) {
    logger = opts
    opts = {}
  }

  assert.equal(typeof opts, 'object')
  assert.equal(typeof logger, 'object')

  opts.level = opts.level || 'info'

  const ts = json.parse()
  const ws = through({ objectMode: true }, function (chunk, enc, cb) {
    logger[opts.level](chunk)
    cb()
  })

  return pump(ts, ws)
}
