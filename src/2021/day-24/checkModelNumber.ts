import type { AluInput, AluInstruction } from './alu';
import { alu } from './alu';

export function checkModelNumber(
  modelNumber: number,
  instructions: AluInstruction[],
): boolean {
  if (modelNumber.toString().length !== 14) {
    throw new Error('Model numbers must be 14 digits long.');
  }

  if (modelNumber.toString().includes('0')) {
    throw new Error('Model numbers cannot contain a 0.');
  }

  const modelNumberDigits = [...`${modelNumber}`].map(Number);
  const currentInputValue = (function* () {
    let i = 0;

    while (true) {
      yield modelNumberDigits[i];
      i++;
    }
  })();

  const inputState: AluInput = {};
  Object.defineProperty(inputState, 'w', {
    get: () => currentInputValue.next().value,
  });

  const output = alu(inputState, instructions);

  return output.z === 0;
}
