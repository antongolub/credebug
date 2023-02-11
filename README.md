# credebug
CLI to check if some credential value is defined or not

Strange things happen sometimes. You're using a tool that relies on environment variables and cred arguments, but doesn't assert them, and falls apart for no reason. This snippet helps to debug misconfiguration.

> ### ⚠️ Warning
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

A slightly safer way. At least you can see the script code before running it.

```bash
node -e 'let entries=process.argv.map(((e,t,s)=>{if(!e.startsWith("--"))return;const[r,n]=e.slice(2).split("=");return[r,n||s[t+1]&&!s[t+1]?.startsWith("--")]})).filter(Boolean);entries.length||(entries=Object.entries(process.env));const result=entries.reduce(((e,[t,s])=>{const r=s?"***":"<empty>";return`${e}\n${/^[a-zA-Z_]+$/.test(t)?t:"***"}: ${r}`}),"");console.log(result);' -- --test='t' foo bar --baz --qux=quux --oopsIputMyPass0rdHere='t' --asv00124 --a --b --c=c --d d
```

## License
[MIT](./LICENSE)
