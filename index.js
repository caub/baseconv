const DEFAULT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

// inspired from https://codegolf.stackexchange.com/questions/1620/arbitrary-base-conversion/21672#21672

/**
 * Convert a string or number from srcRadix to dstRadix
 * @param {string} [inputAlphabet='0123456789abcdef'] alphabet of the input string
 * @param {string} [outputAlphabet=DEFAULT_ALPHABET] alphabet to buse for the output string
 * @returns {(input: string | number, inputBase?: number, outputBase?: number) => string}
 */
module.exports = function BaseConv(_str = '', inputAlphabet = '0123456789abcdef', outputAlphabet = DEFAULT_ALPHABET) {
  // char => position map, to avoid calling a O(n) indexOf
  const inputAlphabetMap = new Map(Array.from(inputAlphabet, (s, i) => [s, i]));

  return (_str = '', inputBase = inputAlphabet.length, outputBase = outputAlphabet.length) => {
    if (outputBase > outputAlphabet.length) throw new Error(`Output radix exceeds the outputAlphabet length (${outputAlphabet.length})`);

    const res = [];
    const str = _str + '';
    const s = inputBase <= 36 ? str.toLowerCase() : str;
    let nums = Array.from(s, x => inputAlphabetMap.get(x));

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
      .map(x => outputAlphabet[x])
      .join('');
  };
}
