#!/usr/bin/env node

// Do not use this tool in production. It's just a proof of concept.
// Instead, write your own implementation and put it in a repository you can trust.

const {argv} = process
const result = argv.reduce((acc, arg, i) => {
  // log only named args (options)
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=')
    const _value = value || (argv[i + 1] && !argv[i + 1]?.startsWith('--'))
    const _key = /^[a-z]+$/.test(key) ? key : '***'

    return  `${acc}\n${_key}: ${_value ? '***' : '<empty>'}`
  }

  return acc
}, '')

console.log(result)
