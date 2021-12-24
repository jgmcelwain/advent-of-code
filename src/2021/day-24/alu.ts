export enum AluKey {
  W = 'w',
  X = 'x',
  Y = 'y',
  Z = 'z',
}

export enum AluInstructionKind {
  Input = 'inp',
  Add = 'add',
  Multiply = 'mul',
  Divide = 'div',
  Modulo = 'mod',
  Equality = 'eql',
}

type AluInstructionPayloadTypes = {
  [AluInstructionKind.Input]: { a: AluKey };
  [AluInstructionKind.Add]: { a: AluKey; b: number | AluKey };
  [AluInstructionKind.Multiply]: { a: AluKey; b: number | AluKey };
  [AluInstructionKind.Divide]: { a: AluKey; b: number | AluKey };
  [AluInstructionKind.Modulo]: { a: AluKey; b: number | AluKey };
  [AluInstructionKind.Equality]: { a: AluKey; b: number | AluKey };
};

type AluInstructionVarMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { kind: Key }
    : { kind: Key } & M[Key];
};

export type AluInstruction =
  AluInstructionVarMap<AluInstructionPayloadTypes>[keyof AluInstructionVarMap<AluInstructionPayloadTypes>];

export type AluState = Record<AluKey, number>;
export type AluInput = Partial<AluState>;

export function alu(
  inputState: AluInput,
  instructions: AluInstruction[],
): AluState {
  const state: AluState = { w: 0, x: 0, y: 0, z: 0 };

  for (const [index, instruction] of instructions.entries()) {
    if (instruction.kind === AluInstructionKind.Input) {
      const value = inputState[instruction.a];

      if (value === undefined) {
        throw new Error(
          `Instruction ${index + 1}: Attempted to read input from ${
            instruction.a
          } but no value was found`,
        );
      }

      state[instruction.a] = value;
    } else {
      if (instruction.b === null) {
        throw new Error(
          `Instruction ${
            index + 1
          }: A second value (variable or number) is required to execute a ${
            instruction.kind
          } instruction.`,
        );
      }

      const b =
        typeof instruction.b === 'string'
          ? state[instruction.b]
          : instruction.b;

      switch (instruction.kind) {
        case AluInstructionKind.Add: {
          state[instruction.a] += b;
          break;
        }
        case AluInstructionKind.Multiply: {
          state[instruction.a] *= b;
          break;
        }
        case AluInstructionKind.Divide: {
          state[instruction.a] = Math.floor(state[instruction.a] / b);
          break;
        }
        case AluInstructionKind.Modulo: {
          state[instruction.a] %= b;
          break;
        }
        case AluInstructionKind.Equality: {
          state[instruction.a] = state[instruction.a] === b ? 1 : 0;
          break;
        }
      }
    }
  }

  return state;
}
