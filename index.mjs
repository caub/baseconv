let CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let CHARSET_MAP; // char => position map, to avoid calling indexOf

const setCharset = charset => {
  CHARSET = charset;
  CHARSET_MAP = new Map(Array.from(charset, (s, i) => [s, i]));
}

setCharset(CHARSET);

// inspired from https://codegolf.stackexchange.com/questions/1620/arbitrary-base-conversion/21672#21672

/**
 * Convert a string or number from srcRadix to dstRadix
 * @param {String | Number} str 
 * @param {Number} srcBase 
 * @param {Number} dstBase 
 * @param {Boolean} safe avoid throwing for unrecognized input chars, and just ignore
 * @returns {String}
 */
const convert = (_str = '', src_base = 10, dst_base = CHARSET.length, safe) => {
  if (dst_base > CHARSET.length) throw new Error(`src or dst radix exceeds current charset length (${CHARSET.length})`);

  const res = [];
  const str = _str + '';
  const s = src_base <= 36 ? str.toLowerCase() : str;
  let nums = Array.from(s, x => CHARSET_MAP.get(x));

  while (nums.length) {
    // divide successive powers of dst_base
    const quotient = [];
    let remainder = 0;
    for (var i = 0; i < nums.length; i++) {
      if (nums[i] >= src_base) {
        if (safe) continue;
        throw new Error(`digit "${s[i]}" is unknown for base=${src_base}`);
      }
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

  return res.reverse()
    .map(x => CHARSET[x])
    .join('');
};

convert.setCharset = setCharset;

export default convert;
