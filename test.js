const BaseConv = require('.');

const conv = BaseConv();

console.assert(conv('999', 10, 10) == '999');

console.assert(conv('999', 10, 16) == (999).toString(16));
console.assert(conv(conv('999', 10, 16), 16, 10) == '999');

console.assert(conv('999', 10, 36) == (999).toString(36));
console.assert(conv(conv('999', 10, 36), 36, 10) == '999');

console.assert(conv('999', 10, 62) == 'g7');
console.assert(conv('g7', 62, 10) == '999');

console.log('-- throw if dest base > CHARSET.length');
try {
  conv('999', 10, 65);
  console.assert(false)
}
catch (e) {
  console.assert(e.message.includes('radix'));
}

console.log('-- ignore chars out of input base');
const x = conv('9a99', 10, 62);
console.assert(x === conv('999', 10, 62))

const conv2 = BaseConv('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
console.assert(conv2('999', 10, 64) == 'fD');
console.assert(conv2('fD', 64, 10) == '999');

const s1 = 'lolthismustbeahugenumber';
const s2 = conv2(s1, 36, 10);
console.assert(!Number.isSafeInteger(s2));
console.assert(conv2(s2, 10, 36), s1);

const num = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
console.assert(num.toString(36), conv2(num, 10, 36));

console.log('OK');
