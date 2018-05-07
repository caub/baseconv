# radix conversion

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

- default charset is `'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'` (base62)
- you can change it with `conv.setCharset`
- no IEEE-754 limitation

usage:
```js
const conv = require('base-conv')
console.log(conv(42, 10, 16)) // '2a'
console.log(conv('42', 10, 16)) // '2a'
```

[npm-image]: https://img.shields.io/npm/v/base-conv.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/base-conv
[travis-image]: https://img.shields.io/travis/caub/base-conv.svg?style=flat-square
[travis-url]: https://travis-ci.org/caub/base-conv