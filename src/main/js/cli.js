#!/usr/bin/env node

// Do not use this tool in production. It's just a proof of concept.
// Instead, write your own implementation and put it in a repository you can trust.

// Use named args if any
let entries = process.argv.map((v, i, argv) => {
    // Capture only named args (options)
    if (!v.startsWith('--')) {
      return
    }
    const [key, value] = v.slice(2).split('=')
    const _value = value || (argv[i + 1] && !argv[i + 1]?.startsWith('--'))

    return [key, _value]
  }).filter(Boolean)

// Fallback to env variables otherwise
if (!entries.length) {
  entries = Object.entries(process.env)
}

const result = entries.reduce((acc, [key, value]) => {
  const _value = value ? '***' : '<empty>'
  const _key = /^[a-zA-Z_]+$/.test(key) ? key : '***'

  return `${acc}\n${_key}: ${_value}`
}, '')

console.log(result)
