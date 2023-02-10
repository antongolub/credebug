# credebug
> CLI to check if some credential value is defined or not. Not safe for production usage.

## ⚠️ Warning
Do not use this tool in production. It's just a proof of concept.  
Instead, write your own implementation and put it in a repository you can trust.

## Usage
```bash
npx credebug --test='t' foo bar --baz --qux=quux --oopsIputMyPass0rdHere='t' --asv00124 --a --b --c=c --d d

test: ***
***
***
baz: <empty>
qux: ***
***: ***
***: <empty>
a: <empty>
b: <empty>
c: ***
```

A bit more safe way. At least you can see the script code before running it.

```bash
node -e 'const{argv:argv}=process,result=argv.reduce(((t,r,s)=>{if(r.startsWith("--")){const[e,a]=r.slice(2).split("="),c=a||argv[s+1]&&!argv[s+1]?.startsWith("--");return`${t}\n${/^[a-z]+$/.test(e)?e:"***"}: ${c?"***":"<empty>"}`}return t}),"");console.log(result);' -- --test='t' foo bar --baz --qux=quux --oopsIputMyPass0rdHere='t' --asv00124 --a --b --c=c --d d
```

## License
[MIT](./LICENSE)
