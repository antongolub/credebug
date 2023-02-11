const assert = require('node:assert')
const test = require('node:test')
const cp = require('node:child_process')

test('CLI prints masked options if any', () => {
  const {stdout} = cp.spawnSync('node', [
    './src/main/js/cli.js',
    '--test=\'t\'',
    'foo',
    'bar',
    '--baz',
    '--qux=quux',
    '--oopsIputMyPass0rdHere="t"',
    '--asv00124',
    '--a',
    '--b',
    '--c=c',
    '--d',
    'd'
  ])

  assert.strictEqual(stdout.toString(), `
test: ***
baz: <empty>
qux: ***
***: ***
***: <empty>
a: <empty>
b: <empty>
c: ***
d: ***
`)
})

test('CLI captures env variables otherwise', () => {
  const {stdout} = cp.spawnSync('node', ['./src/main/js/cli.js'], {
    env: {
      PATH: process.env.PATH,
      A: 'a',
      B: 'b',
      C: ''
    }
  })

  assert.ok(stdout.toString().includes(`
A: ***
B: ***
C: <empty>
`))
})
