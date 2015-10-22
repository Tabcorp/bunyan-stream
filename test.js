const bunyan = require('bunyan')
const test = require('tape')
const bl = require('bl')

const bunyanStream = require('./')

test('should assert input types', function (t) {
  t.plan(2)
  t.throws(bunyanStream.bind(null, ''), /object/)
  t.throws(bunyanStream.bind(null, '', ''), /object/)
})

test('accept a stream and log data', function (t) {
  t.plan(3)

  const buf = bl()
  buf.on('data', function (data) {
    const obj = JSON.parse(String(data))
    t.equal(typeof obj, 'object')
    t.equal(obj.level, 30)
    t.equal(obj.name, 'bar')
  })

  const logger = bunyan.createLogger({ stream: buf, name: 'foo' })
  const ws = bunyanStream(logger)
  ws.write({ name: 'bar' })
})

test('allow config', function (t) {
  t.plan(4)

  const buf = bl()
  buf.on('data', function (data) {
    const obj = JSON.parse(String(data))
    t.equal(typeof obj, 'object')
    t.equal(obj.level, 50)
    t.equal(obj.name, 'foo')
    t.equal(obj.foo, 'bar')
  })

  const logger = bunyan.createLogger({
    name: 'foo',
    stream: buf
  })
  const ws = bunyanStream({ level: 'error' }, logger)
  ws.write({ foo: 'bar' })
})
