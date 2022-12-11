import { z } from 'zod';

export const monkeySchema = z.object({
  items: z.array(z.number()),
  operation: z.function().args(z.number()).returns(z.number()),
  test: z.object({
    divisibleBy: z.number(),
    passDestination: z.number(),
    failDestination: z.number(),
  }),
});
export type Monkey = z.infer<typeof monkeySchema>;

export function processMonkeyInput(input: string) {
  return input.split('\n\n').map((monkey) => {
    let items: number[] = [];
    let operation = (worryLevel: number) => worryLevel;
    const test = {
      divisibleBy: 0,
      passDestination: -1,
      failDestination: -1,
    };

    const lines = monkey
      .split('\n')
      .map((l) => l.trim())
      .slice(1);

    for (const [lineIndex, line] of lines.entries()) {
      switch (lineIndex) {
        case 0: {
          items = line.replace('Starting items: ', '').split(', ').map(Number);
          break;
        }
        case 1: {
          const [op, value] = line
            .replace('Operation: new = old ', '')
            .split(' ');

          let parsedValue: number | 'worryLevel' = Number(value);
          if (Number.isNaN(parsedValue)) {
            parsedValue = 'worryLevel';
          }

          switch (op) {
            case '*': {
              operation = (worryLevel) =>
                worryLevel *
                (parsedValue === 'worryLevel' ? worryLevel : parsedValue);
              break;
            }
            case '+': {
              operation = (worryLevel) =>
                worryLevel +
                (parsedValue === 'worryLevel' ? worryLevel : parsedValue);
              break;
            }
          }
          break;
        }
        case 2: {
          const testDivisibleBy = line.replace('Test: divisible by ', '');

          test.divisibleBy = Number.isNaN(Number(testDivisibleBy))
            ? 0
            : Number(testDivisibleBy);
          break;
        }
        case 3: {
          const destination = line.replace('If true: throw to monkey ', '');

          test.passDestination = Number(destination);
          break;
        }
        case 4: {
          const destination = line.replace('If false: throw to monkey ', '');

          test.failDestination = Number(destination);
          break;
        }
      }
    }

    return { items, operation, test };
  });
}
