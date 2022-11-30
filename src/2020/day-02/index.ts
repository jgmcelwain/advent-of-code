import { getInput } from '../../../lib/getInput';

type TestCase = {
  limits: { lower: number; upper: number };
  letter: string;
  password: string;
};

function partOne(testCases: TestCase[]) {
  let result = 0;

  for (let i = 0; i < testCases.length; i++) {
    const letterInstances = testCases[i].password
      .split('')
      .filter((letter) => letter === testCases[i].letter).length;

    if (
      letterInstances >= testCases[i].limits.lower &&
      letterInstances <= testCases[i].limits.upper
    ) {
      result++;
    }
  }

  console.log('Part One: ', result);
}

function partTwo(testCases: TestCase[]) {
  let result = 0;

  for (let i = 0; i < testCases.length; i++) {
    const atLower =
      testCases[i].password.charAt(testCases[i].limits.lower - 1) ===
      testCases[i].letter;
    const atUpper =
      testCases[i].password.charAt(testCases[i].limits.upper - 1) ===
      testCases[i].letter;

    if ((atLower && !atUpper) || (!atLower && atUpper)) {
      result++;
    }
  }

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const testCases: TestCase[] = input.split('\n').map((entry) => {
    const [lowerLimit, upperLimit, letter, password] = entry
      .replace('-', ' ')
      .replace(':', '')
      .split(' ');

    return {
      limits: {
        lower: Number(lowerLimit),
        upper: Number(upperLimit),
      },
      letter,
      password,
    };
  });

  console.log('AoC 2020 - Day 02: Password Philosophy');
  partOne(testCases);
  partTwo(testCases);
}

if (process.argv.includes('run')) {
  void main();
}
