import * as crypto from 'crypto';

function md5(contents: string) {
  return crypto.createHash('md5').update(contents).digest('hex');
}

export function findMD5LeadingZeroGeneratingInt(
  salt: string,
  zeroCount: number,
) {
  let i = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const hash = md5(`${salt}${i}`);

    if (hash.startsWith(''.padStart(zeroCount, '0'))) {
      break;
    } else {
      i++;
    }
  }

  return i;
}
