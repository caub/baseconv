import conv from './index';

console.assert(conv('999', 10, 10) == '999');

console.assert(conv('999', 10, 16) == (999).toString(16));
console.assert(conv(conv('999', 10, 16), 16, 10) == '999');

console.assert(conv('999', 10, 36) == (999).toString(36));
console.assert(conv(conv('999', 10, 36), 36, 10) == '999');

console.assert(conv('999', 10, 62) == 'g7');
console.assert(conv('g7', 62, 10) == '999');

try {
  conv('999', 10, 64);
}
catch (e) {
  console.assert(e.message.includes('radix'));
}

conv.setCharset('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_')
console.assert(conv('999', 10, 64) == 'fD');
console.assert(conv('fD', 64, 10) == '999');

const s1 = 'lolthismustbeahugenumber';
const s2 = conv(s1, 36, 10);
console.assert(!Number.isSafeInteger(s2));
console.assert(conv(s2, 10, 36), s1);

console.log('OK');
