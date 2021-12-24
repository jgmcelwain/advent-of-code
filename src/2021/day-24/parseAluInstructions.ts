import { AluInstruction, AluInstructionKind, AluKey } from './alu';

export function parseAluInstructions(input: string) {
  const instructions: AluInstruction[] = input
    .split('\n')
    .map((instruction, i) => {
      const split = instruction.split(' ');

      const kind = split[0] as AluInstructionKind;
      const a = split[1] as AluKey;

      if (kind === AluInstructionKind.Input) {
        return { kind, a };
      } else {
        if (!split[2]) {
          throw new Error(
            `ALU_Input/${
              i + 1
            }: "${kind}" instruction must contain a second value.`,
          );
        }
        const b = isNaN(Number(split[2]))
          ? (split[2] as AluKey)
          : Number(split[2]);

        return { kind, a, b };
      }
    });

  return instructions;
}
