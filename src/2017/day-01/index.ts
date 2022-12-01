import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';

function partOne(digits: number[]) {
  let matchingCount = 0;

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] === (digits[i + 1] ?? digits[0])) {
      matchingCount += digits[i];
    }
  }

  return matchingCount;
}

function partTwo(digits: number[]) {
  let matchingCount = 0;

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] === digits[(i + digits.length / 2) % digits.length]) {
      matchingCount += digits[i];
    }
  }

  return matchingCount;
}

async function main() {
  const input = await getInput(__dirname);
  const digits = input.split('').map(Number);

  void runDay(
    2017,
    1,
    'Inverse Captcha',
    () => partOne(digits),
    () => partTwo(digits),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
