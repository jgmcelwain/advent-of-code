import type { Game } from '.';
import { runSimpleStrategy } from './runSimpleStrategy';
import { runSmartStrategy } from './runSmartStrategy';

const strategyGuide: Game[] = [
  ['A', 'Y'],
  ['B', 'X'],
  ['C', 'Z'],
];

describe('runSimpleStrategy', () => {
  it('executes the simple strategy', () => {
    expect(runSimpleStrategy(strategyGuide)).toBe(15);
  });
});

describe('runSmartStrategy', () => {
  it('executes the smart strategy', () => {
    expect(runSmartStrategy(strategyGuide)).toBe(12);
  });
});
