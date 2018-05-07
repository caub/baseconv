// inspired from https://codegolf.stackexchange.com/questions/1620/arbitrary-base-conversion/21672#21672

let CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let CHARSET_MAP; // char => position map, to avoid calling indexOf

const setCharset = charset => {
  CHARSET = charset;
  CHARSET_MAP = new Map(Array.from(charset, (s, i) => [s, i]));
}

setCharset(CHARSET);

const convert = (numbers, src_base, dst_base) => {
  const res = [];
  let nums = numbers;
  while (nums.length) {
    // divide successive powers of dst_base
    const quotient = [];
    let remainder = 0;
    for (var i = 0; i < nums.length; i++) {
      var accumulator = nums[i] + remainder * src_base;
      const digit = (accumulator / dst_base) | 0; // rounding faster than Math.floor
      remainder = accumulator % dst_base;
      if (quotient.length || digit) quotient.push(digit);
    }

    // the remainder of current division is the next rightmost digit
    res.push(remainder);

    // rinse and repeat with next power of dst_base
    nums = quotient;
  }

  return res.reverse();
};

/**
 * Convert a number from srcRadix to dstRadix
 * note: we don't throw for an unrecognized char
 * @param {String | Number} _str 
 * @param {Number} srcBase 
 * @param {Number} dstBase 
 * @returns {String}
 */
const conv = (_str = '', srcBase = 10, dstBase = CHARSET.length) => {
  if (srcBase > CHARSET.length || dstBase > CHARSET.length) throw new Error(`src or dst radix exceeds current charset length (${CHARSET.length})`);
  const str = _str + '';
  const s = srcBase <= 36 ? str.toLowerCase() : str;
  const num = Array.from(s, x => CHARSET_MAP.get(x));
  return convert(num, srcBase, dstBase)
    .map(x => CHARSET[x])
    .join('');
};

conv.setCharset = setCharset; // rollup doesn't like mixed named and default exports for cjs

export default conv;
