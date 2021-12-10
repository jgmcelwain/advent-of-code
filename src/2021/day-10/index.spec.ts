import { getLineCompletionScore } from './getLineCompletionScore';
import { getLineSyntaxErrorScore } from './getLineSyntaxErrorScore';

const testData = [
  '[({(<(())[]>[[{[]{<()<>>',
  '[(()[<>])]({[<{<<[]>>(',
  '{([(<{}[<>[]}>{[]{[(<()>',
  '(((({<>}<{<{<>}{[]{[]{}',
  '[[<[([]))<([[{}[[()]]]',
  '[{[{({}]{}}([{[{{{}}([]',
  '{<[[]]>}<{[{[{[]{()[[[]',
  '[<(<(<(<{}))><([]([]()',
  '<{([([[(<>()){}]>(<<{{',
  '<{([{{}}[<[[[<>{}]]]>[]]',
];

describe('getLineSyntaxErrorScore', () => {
  it('ignores incomplete lines', () => {
    expect(
      testData
        .map((line) => getLineSyntaxErrorScore(line))
        .filter((errorScore) => errorScore === 0),
    ).toHaveLength(5);
  });

  it('calculates the line score', () => {
    expect(
      testData
        .map((line) => getLineSyntaxErrorScore(line))
        .filter((errorScore) => errorScore > 0),
    ).toEqual([1197, 3, 57, 3, 25137]);
  });
});

describe('getLineCompletionScore', () => {
  it('ignores erroneous lines', () => {
    expect(
      testData
        .map((line) => getLineCompletionScore(line))
        .filter((completionScore) => completionScore === 0),
    ).toHaveLength(5);
  });

  it('calculates the line score', () => {
    expect(
      testData
        .map((line) => getLineCompletionScore(line))
        .filter((completionScore) => completionScore > 0),
    ).toEqual([288957, 5566, 1480781, 995444, 294]);
  });
});
