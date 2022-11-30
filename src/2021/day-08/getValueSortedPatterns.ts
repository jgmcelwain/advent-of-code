export function getValueSortedPatterns(patterns: string[]) {
  const positionMap: Record<string, string> = {};

  // these are the unique segment counts so we can just grab them
  const [one, seven, four, eight] = [2, 3, 4, 7].map(
    (n) => patterns.find((pattern) => pattern.length === n) ?? '',
  );

  // six is the only number that lights up six segments and doesn't include
  // all the segments that one does
  const six =
    patterns.find(
      (pattern) =>
        pattern.length === 6 &&
        one.split('').every((l) => pattern.includes(l)) === false,
    ) ?? '';

  // top right segment is the only segment missing from six, so we can compare
  // six to eight (which has all segments lit) to find what it is
  positionMap.tr = eight.split('').find((l) => six.includes(l) === false) ?? '';

  // one includes just the top right and bottom right segments, so we can just
  // find which one of those isn't the top right to get the bottom right
  positionMap.br = one.split('').find((l) => l !== positionMap.tr) ?? '';

  // five is the only number that lights up five segments and doesn't light up
  // the top right segment
  const five =
    patterns.find(
      (pattern) =>
        pattern.length === 5 && pattern.includes(positionMap.tr) === false,
    ) ?? '';

  // the only difference between five and six is that six includes the bottom
  // left segment - we can use this to find out what it is
  positionMap.bl = six.split('').find((l) => five.includes(l) === false) ?? '';

  // three and two both have five segments but three includes the bottom right
  // segment - two does not
  const three =
    patterns.find(
      (pattern) =>
        pattern.length === 5 &&
        pattern !== five &&
        pattern.includes(positionMap.br),
    ) ?? '';
  const two =
    patterns.find(
      (pattern) =>
        pattern.length === 5 && pattern !== five && pattern !== three,
    ) ?? '';

  // zero and nine both have six segments but zero includes the bottom left
  // segment - nine does not
  const zero =
    patterns.find(
      (pattern) =>
        pattern.length === 6 &&
        pattern !== six &&
        pattern.includes(positionMap.bl),
    ) ?? '';
  const nine =
    patterns.find(
      (pattern) => pattern.length === 6 && pattern !== six && pattern !== zero,
    ) ?? '';

  return [zero, one, two, three, four, five, six, seven, eight, nine];
}
