import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { getLineSyntaxErrorScore } from './getLineSyntaxErrorScore';
import { getLineCompletionScore } from './getLineCompletionScore';

function partOne(lines: string[]) {
  return lines
    .map((line) => getLineSyntaxErrorScore(line))
    .reduce((acc, curr) => (acc += curr), 0);
}

function partTwo(lines: string[]) {
  const completionScores = lines
    .map((line) => getLineCompletionScore(line))
    .filter((score) => score > 0)
    .sort((a, b) => a - b);

  return completionScores[Math.floor(completionScores.length / 2)];
}

async function main() {
  const input = await getInput(__dirname);
  const lines = input.split('\n');

  void runDay(
    2021,
    10,
    'Syntax Scoring',
    () => partOne(lines),
    () => partTwo(lines),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
