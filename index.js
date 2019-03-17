const DEFAULT_CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

// inspired from https://codegolf.stackexchange.com/questions/1620/arbitrary-base-conversion/21672#21672

/**
 * Convert a string or number from srcRadix to dstRadix
 * @param {string?} alphabet
 * @returns {(input: string | number, inputBase?: number, outputBase?: number) => string}
 */
function BaseConv(charset = DEFAULT_CHARSET) {
  const charsetMap = new Map(Array.from(charset, (s, i) => [s, i])); // char => position map, to avoid calling a O(n) indexOf

  return (_str = '', inputBase = 10, outputBase = charset.length) => {
    if (outputBase > charset.length) throw new Error(`dst radix exceeds current charset length (${charset.length})`);

    const res = [];
    const str = _str + '';
    const s = inputBase <= 36 ? str.toLowerCase() : str;
    let nums = Array.from(s, x => charsetMap.get(x));

    while (nums.length) {
      // divide successive powers of outputBase
      const quotient = [];
      let remainder = 0;
      for (var i = 0; i < nums.length; i++) {
        if (nums[i] >= inputBase) {
          continue;
        }
        var accumulator = nums[i] + remainder * inputBase;
        const digit = (accumulator / outputBase) | 0; // rounding faster than Math.floor
        remainder = accumulator % outputBase;
        if (quotient.length || digit) quotient.push(digit);
      }

      // the remainder of current division is the next rightmost digit
      res.push(remainder);

      // rinse and repeat with next power of outputBase
      nums = quotient;
    }

    return res.reverse()
      .map(x => charset[x])
      .join('');
  };
}

module.exports = BaseConv;
