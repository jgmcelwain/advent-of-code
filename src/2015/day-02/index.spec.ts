import { getPaperAmount } from './getPaperAmount';
import { getRibbonLength } from './getRibbonLength';

test('getPaperAmount', () => {
  expect(getPaperAmount([[2, 3, 4]])).toBe(58);
  expect(getPaperAmount([[1, 1, 10]])).toBe(43);
});

test('getRibbonLength', () => {
  expect(getRibbonLength([[2, 3, 4]])).toBe(34);
  expect(getRibbonLength([[1, 1, 10]])).toBe(14);
});
