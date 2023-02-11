const assert = require('node:assert')
const test = require('node:test')
const cp = require('node:child_process')

test('CLI outputs masked values', () => {
  const {stdout} = cp.spawnSync('node', [
    './src/main/js/cli.min.js',
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
