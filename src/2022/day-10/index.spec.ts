import { executeCPUInstructions, parseCPUInstructions } from './cpu';
import { drawInstructionsOutput } from './drawInstructionsOutput';
import { sumInterestingSignals } from './sumInterestingSignals';

const input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

describe('cpu', () => {
  describe('parseCPUInstructions', () => {
    it('converts a raw input into cpu instructions', () => {
      const convertedInput = parseCPUInstructions(input.split('\n'));

      expect(convertedInput.length).toBe(240);
      expect(convertedInput[0]).toStrictEqual(['noop', 0]);
      expect(convertedInput[1]).toStrictEqual(['addx', 15]);
      expect(convertedInput[239]).toStrictEqual(['noop', 0]);
    });
  });

  describe('executeCPUInstructions', () => {
    const instructions = parseCPUInstructions(input.split('\n'));

    it('runs the cpu instructions', () => {
      expect(executeCPUInstructions(instructions, 220)).toBe(18);
    });

    it('runs a function after each iteration', () => {
      let callCount = 0;

      executeCPUInstructions(instructions, 1234, () => callCount++);

      expect(callCount).toBe(1234);
    });
  });
});

describe('sumInterestingSignals', () => {
  it('sums up the "interesting signals" output by a set of cpu instructions', () => {
    const instructions = parseCPUInstructions(input.split('\n'));

    expect(sumInterestingSignals(instructions)).toBe(13140);
  });
});

describe('drawInstructionsOutput', () => {
  it('uses the instructions to dictate which pixels should be turned on in the output', () => {
    const instructions = parseCPUInstructions(input.split('\n'));

    expect(drawInstructionsOutput(instructions)).toBe(`
██  ██  ██  ██  ██  ██  ██  ██  ██  ██  
███   ███   ███   ███   ███   ███   ███ 
████    ████    ████    ████    ████    
█████     █████     █████     █████     
██████      ██████      ██████      ████
███████       ███████       ███████     `);
  });
});
