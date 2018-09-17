# radix conversion

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage status][codecov-image]][codecov-url]

- default charset is `'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'`
- you can change it with `conv.setCharset`
- no IEEE-754 limitation

usage:
```js
const conv = require('base-conv')
conv(42, 10, 16) // '2a'
conv('42', 10, 16) // '2a'
conv('42'.repeat(100), 10, 16) // '8de2991df40ff783057818d0012f3bc1c...'
```

[npm-image]: https://img.shields.io/npm/v/base-conv.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/base-conv
[travis-image]: https://img.shields.io/travis/caub/base-conv.svg?style=flat-square
[travis-url]: https://travis-ci.org/caub/base-conv
[codecov-image]: https://img.shields.io/codecov/c/github/caub/base-conv.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/caub/base-conv
