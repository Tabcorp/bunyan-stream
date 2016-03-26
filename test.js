const through = require('through2')
const bunyan = require('bunyan')
const test = require('tape')

const bunyanStream = require('./')

test('should assert input types', function (t) {
  t.plan(2)
  t.throws(bunyanStream.bind(null, ''), /object/)
  t.throws(bunyanStream.bind(null, '', ''), /object/)
})

test('accept a stream and log data', function (t) {
  t.plan(3)

  const buf = through(function (data) {
    const obj = JSON.parse(String(data))
    t.equal(typeof obj, 'object')
    t.equal(obj.level, 30)
    t.equal(obj.name, 'bar')
    buf.end()
  })

  const logger = bunyan.createLogger({ stream: buf, name: 'foo' })
  const ws = bunyanStream(logger)
  ws.end('{"name":"bar"}\n')
})

test('allow config', function (t) {
  t.plan(4)

  const buf = through(function (data) {
    const obj = JSON.parse(String(data))
    t.equal(typeof obj, 'object')
    t.equal(obj.level, 50)
    t.equal(obj.name, 'foo')
    t.equal(obj.foo, 'bar')
    buf.end()
  })

  const logger = bunyan.createLogger({ name: 'foo', stream: buf })
  const ws = bunyanStream({ level: 'error' }, logger)
  ws.end('{"foo":"bar"}\n')
})
