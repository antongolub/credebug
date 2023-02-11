# credebug

[![Release](https://github.com/antongolub/credebug/workflows/CI/badge.svg)](https://github.com/antongolub/credebug/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/150b4d4d62cea4bd3266/maintainability)](https://codeclimate.com/github/antongolub/credebug/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/150b4d4d62cea4bd3266/test_coverage)](https://codeclimate.com/github/antongolub/credebug/test_coverage)

CLI to check if some credential value is defined or not

Strange things happen sometimes. You're using a tool that relies on environment variables and cred arguments, but doesn't assert them, and falls apart for no reason. This snippet helps to debug misconfiguration.

> #### ⚠️ Warning
> Do not use this tool in production. It's just a proof of concept.  
> Write your own implementation and put it in a repository you can trust.

## Usage
```bash
npx credebug --test='t' foo bar --baz --qux=quux --oopsIputMyPass0rdHere='t' --asv00124 --a --b --c=c --d d

test: ***
baz: <empty>
qux: ***
***: ***
***: <empty>
a: <empty>
b: <empty>
c: ***
d: ***
```

If no option is provided, it will check all environment variables.

```bash
npx credebug

PATH: ***
npm_package_json: ***
_: ***
npm_config_userconfig: ***
npm_config_init_module: ***
npm_command: ***
```

A slightly safer usage way. At least you can see the script code before running it.

```bash
node -e 'let entries=process.argv.map(((e,t,s)=>{if(!e.startsWith("--"))return;const[r,n]=e.slice(2).split("=");return[r,n||s[t+1]&&!s[t+1]?.startsWith("--")]})).filter(Boolean);entries.length||(entries=Object.entries(process.env));const result=entries.reduce(((e,[t,s])=>{const r=s?"***":"<empty>";return`${e}\n${/^[a-zA-Z_]+$/.test(t)?t:"***"}: ${r}`}),"");console.log(result);' -- --test='t' foo bar --baz --qux=quux --oopsIputMyPass0rdHere='t' --asv00124 --a --b --c=c --d d
```

## License
[MIT](./LICENSE)
