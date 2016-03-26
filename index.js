const through = require('through2')
const assert = require('assert')
const ndjson = require('ndjson')
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

  const ts = ndjson.parse()
  const ws = through({ objectMode: true, allowHalfOpen: false }, transform)
  pump(ts, ws)

  return ts

  function transform (chunk, enc, cb) {
    const msg = chunk.message ? chunk.message : ''
    if (chunk.message) delete chunk.message
    logger[opts.level](chunk, msg)
    cb()
  }
}
