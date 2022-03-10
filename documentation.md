# Documentation Index

- [Database Documentation][database_doc]

## Setting Up Environment

1. Run `npm install`
2. Rename .env.template to .env
3. Fill in info in .env

## Code To Generate Test UUID

```js
const strLength = 24;

let uuid = "";
for (let i = 0; i < strLength; i++) {
  uuid += Math.floor(Math.random() * 16).toString(16);
}
console.log(uuid);
```

[database_doc]: documentation/database_doc.md
