/* eslint-disable @typescript-eslint/no-unsafe-assignment */
type Intcode = number[];

export function executeIntcode(intcode: Intcode) {
  let cursor = 0;

  while (cursor < intcode.length) {
    const opcode = intcode[cursor];

    switch (opcode) {
      case 1: {
        const destination = intcode[cursor + 3];
        if (destination === undefined) throw new Error();

        const firstOperand = intcode[cursor + 1];
        const secondOperand = intcode[cursor + 2];
        if (firstOperand === undefined || secondOperand === undefined) {
          throw new Error();
        }

        const firstValue = intcode[firstOperand];
        const secondValue = intcode[secondOperand];
        if (firstValue === undefined || secondValue === undefined) {
          throw new Error();
        }

        intcode[destination] = firstValue + secondValue;

        break;
      }
      case 2: {
        const destination = intcode[cursor + 3];
        if (destination === undefined) throw new Error();

        const firstOperand = intcode[cursor + 1];
        const secondOperand = intcode[cursor + 2];
        if (firstOperand === undefined || secondOperand === undefined) {
          throw new Error();
        }

        const firstValue = intcode[firstOperand];
        const secondValue = intcode[secondOperand];
        if (firstValue === undefined || secondValue === undefined) {
          throw new Error();
        }

        intcode[destination] = firstValue * secondValue;

        break;
      }
      case 99: {
        return intcode[0];
      }
      default: {
        throw new Error(`Unrecognized opcode ${opcode ?? ''}.`);
      }
    }

    cursor += 4;
  }

  return intcode[0];
}
