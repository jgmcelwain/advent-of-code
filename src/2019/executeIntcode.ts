type Intcode = number[];

export function executeIntcode(intcode: Intcode) {
  let cursor = 0;

  while (cursor < intcode.length) {
    const opcode = intcode[cursor];

    switch (opcode) {
      case 1: {
        intcode[intcode[cursor + 3]] =
          intcode[intcode[cursor + 1]] + intcode[intcode[cursor + 2]];

        break;
      }
      case 2: {
        intcode[intcode[cursor + 3]] =
          intcode[intcode[cursor + 1]] * intcode[intcode[cursor + 2]];

        break;
      }
      case 99: {
        return intcode[0];
      }
      default: {
        throw new Error(`Unrecognized opcode ${opcode}.`);
      }
    }

    cursor += 4;
  }

  return intcode[0];
}
