export async function runDay(
  year: number,
  day: number,
  title: string,
  partOne?: (() => unknown) | (() => Promise<unknown>),
  partTwo?: (() => unknown) | (() => Promise<unknown>),
  timeExecution = false,
) {
  console.log(`AoC ${year} - Day ${day.toString().padStart(2, '0')}: ${title}`);

  if (partOne !== undefined) {
    console.log('');
    console.log('-- Part One --');

    if (timeExecution) console.time('Runtime');

    const resultOne = await partOne();
    console.log('Answer:', resultOne);

    if (timeExecution) console.timeEnd('Runtime');
  }

  if (partTwo !== undefined) {
    console.log('');
    console.log('-- Part Two --');

    if (timeExecution) console.time('Runtime');

    const resultTwo = await partTwo();
    console.log('Answer:', resultTwo);

    if (timeExecution) console.timeEnd('Runtime');
  }

  console.log('');

  return;
}
