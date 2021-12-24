import { readFile } from 'fs/promises';
import path from 'path';

import { alu, AluInstruction, AluInstructionKind, AluKey } from './alu';
import { checkModelNumber } from './checkModelNumber';
import { parseAluInstructions } from './parseAluInstructions';

const inverseInstructions: AluInstruction[] = [
  { kind: AluInstructionKind.Input, a: AluKey.X },
  { kind: AluInstructionKind.Multiply, a: AluKey.X, b: -1 },
];

const isTripleValueInstructions: AluInstruction[] = [
  { kind: AluInstructionKind.Input, a: AluKey.Z },
  { kind: AluInstructionKind.Input, a: AluKey.X },
  { kind: AluInstructionKind.Multiply, a: AluKey.Z, b: 3 },
  { kind: AluInstructionKind.Equality, a: AluKey.Z, b: AluKey.X },
];

const convertToBinaryInstructions: AluInstruction[] = [
  { kind: AluInstructionKind.Input, a: AluKey.W },
  { kind: AluInstructionKind.Add, a: AluKey.Z, b: AluKey.W },
  { kind: AluInstructionKind.Modulo, a: AluKey.Z, b: 2 },
  { kind: AluInstructionKind.Divide, a: AluKey.W, b: 2 },
  { kind: AluInstructionKind.Add, a: AluKey.Y, b: AluKey.W },
  { kind: AluInstructionKind.Modulo, a: AluKey.Y, b: 2 },
  { kind: AluInstructionKind.Divide, a: AluKey.W, b: 2 },
  { kind: AluInstructionKind.Add, a: AluKey.X, b: AluKey.W },
  { kind: AluInstructionKind.Modulo, a: AluKey.X, b: 2 },
  { kind: AluInstructionKind.Divide, a: AluKey.W, b: 2 },
  { kind: AluInstructionKind.Modulo, a: AluKey.W, b: 2 },
];

describe('parseAluInstructions', () => {
  it('converts a text input into iterable alu instructions', () => {
    expect(
      parseAluInstructions(`inp x
mul x -1`),
    ).toEqual(inverseInstructions);

    expect(
      parseAluInstructions(`inp z
inp x
mul z 3
eql z x`),
    ).toEqual(isTripleValueInstructions);

    expect(
      parseAluInstructions(`inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`),
    ).toEqual(convertToBinaryInstructions);
  });
});

describe('alu', () => {
  it('executes a set of alu instructions', () => {
    expect(alu({ x: 4 }, inverseInstructions)).toHaveProperty('x', -4);
    expect(alu({ x: -4 }, inverseInstructions)).toHaveProperty('x', 4);

    expect(alu({ x: 12, z: 4 }, isTripleValueInstructions)).toHaveProperty(
      'z',
      1,
    );
    expect(alu({ x: 12, z: 3 }, isTripleValueInstructions)).toHaveProperty(
      'z',
      0,
    );

    expect(alu({ w: 12 }, convertToBinaryInstructions)).toEqual({
      w: 1,
      x: 1,
      y: 0,
      z: 0,
    });
    expect(alu({ w: 6 }, convertToBinaryInstructions)).toEqual({
      w: 0,
      x: 1,
      y: 1,
      z: 0,
    });
    expect(alu({ w: 5 }, convertToBinaryInstructions)).toEqual({
      w: 0,
      x: 1,
      y: 0,
      z: 1,
    });
    expect(alu({ w: 15 }, convertToBinaryInstructions)).toEqual({
      w: 1,
      x: 1,
      y: 1,
      z: 1,
    });
  });
});

describe('checkModelNumber', () => {
  it('checks if a 14 digit model number passes the MONAD program', async () => {
    const instructionText = await readFile(path.join(__dirname, 'input.txt'), {
      encoding: 'utf-8',
    });

    const instructions = parseAluInstructions(instructionText.trim());

    expect(checkModelNumber(12312312312312, instructions)).toBe(false);
    expect(checkModelNumber(99598963999971, instructions)).toBe(true);
    expect(checkModelNumber(93151411711211, instructions)).toBe(true);
    expect(checkModelNumber(99999999999999, instructions)).toBe(false);
  });
});
