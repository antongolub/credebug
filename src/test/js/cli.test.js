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

test('CLI works like assert: if some option is undefined it sets error code', () => {
  const {status: status1} = cp.spawnSync('node', ['./src/main/js/cli.js', '--foo=bar'])
  const {status: status2} = cp.spawnSync('node', ['./src/main/js/cli.js', '--foo='])

  assert.equal(status1, 0)
  assert.equal(status2, 1)
})

test('cli.min.js works fine too', () => {
  const {stdout: output1} = cp.spawnSync('node', ['./src/main/js/cli.min.js'], {env: {PATH: process.env.PATH, A: 'a'}})
  const {stdout: output2} = cp.spawnSync('node', ['./src/main/js/cli.min.js', '--test=t', 'foo', '--bar', 'baz', '--passW0rd!'])

  assert.ok(output1.toString().includes(`A: ***`))
  assert.ok(output2.toString().includes(`test: ***`))
})
