import { getInput } from '../../../lib/getInput';
import { getLineSyntaxErrorScore } from './getLineSyntaxErrorScore';
import { getLineCompletionScore } from './getLineCompletionScore';

export const CHUNK_STARTS = ['(', '[', '{', '<'];
export const CHUNK_ENDS = [')', ']', '}', '>'];

function partOne(lines: string[]) {
  const result = lines
    .map((line) => getLineSyntaxErrorScore(line))
    .reduce((acc, curr) => (acc += curr), 0);
  console.log('Part One: ', result);
}

function partTwo(lines: string[]) {
  const completionScores = lines
    .map((line) => getLineCompletionScore(line))
    .filter((score) => score > 0)
    .sort((a, b) => a - b);

  const result = completionScores[Math.floor(completionScores.length / 2)];

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const lines = input.split('\n');

  console.log('AoC 2021 - Day 10: Syntax Scoring');
  partOne(lines);
  partTwo(lines);
}

if (process.argv.includes('run')) {
  main();
}
