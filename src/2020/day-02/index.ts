import { getInput } from '@/lib/getInput';
import { z } from 'zod';

type TestCase = {
  limits: { lower: number; upper: number };
  letter: string;
  password: string;
};

function partOne(testCases: TestCase[]) {
  let result = 0;

  for (const testCase of testCases) {
    const letterInstances = testCase.password
      .split('')
      .filter((letter) => letter === testCase.letter).length;

    if (
      letterInstances >= testCase.limits.lower &&
      letterInstances <= testCase.limits.upper
    ) {
      result++;
    }
  }

  console.log('Part One: ', result);
}

function partTwo(testCases: TestCase[]) {
  let result = 0;

  for (const testCase of testCases) {
    const atLower =
      testCase.password.charAt(testCase.limits.lower - 1) === testCase.letter;
    const atUpper =
      testCase.password.charAt(testCase.limits.upper - 1) === testCase.letter;

    if ((atLower && !atUpper) || (!atLower && atUpper)) {
      result++;
    }
  }

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const parsedTestCaseSchema = z.tuple([
    z.string(),
    z.string(),
    z.string(),
    z.string(),
  ]);
  const testCases = input.split('\n').map((entry): TestCase => {
    const [lowerLimit, upperLimit, letter, password] =
      parsedTestCaseSchema.parse(
        entry.replace('-', ' ').replace(':', '').split(' '),
      );

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
