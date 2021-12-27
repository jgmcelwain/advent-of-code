import { parseSeaFloor } from './parseSeaFloor';
import { printSeaFloor } from './printSeaFloor';
import { updateSeaFloor } from './updateSeaFloor';

const oneDimensionSeaFloor = '...>>>>>...';
const twoDimensionsSeaFloor = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

describe('parseSeaFloor', () => {
  it('parses a sea floor input string', () => {
    expect(parseSeaFloor(oneDimensionSeaFloor)).toStrictEqual([
      [null, null, null, '>', '>', '>', '>', '>', null, null, null],
    ]);

    expect(parseSeaFloor(twoDimensionsSeaFloor)).toStrictEqual([
      ['v', null, null, null, '>', '>', null, 'v', 'v', '>'],
      [null, 'v', 'v', '>', '>', null, 'v', 'v', null, null],
      ['>', '>', null, '>', 'v', '>', null, null, null, 'v'],
      ['>', '>', 'v', '>', '>', null, '>', null, 'v', null],
      ['v', '>', 'v', null, 'v', 'v', null, 'v', null, null],
      ['>', null, '>', '>', null, null, 'v', null, null, null],
      [null, 'v', 'v', null, null, '>', null, '>', 'v', null],
      ['v', null, 'v', null, null, '>', '>', 'v', null, 'v'],
      [null, null, null, null, 'v', null, null, 'v', null, '>'],
    ]);
  });
});

describe('updateSeaFloor', () => {
  it('moves sea cucumbers in one dimension', () => {
    const seaFloor = parseSeaFloor(oneDimensionSeaFloor);

    const [firstPass, firstPassMoveCount] = updateSeaFloor(seaFloor);

    expect(firstPassMoveCount).toBe(1);
    expect(firstPass).toStrictEqual([
      [null, null, null, '>', '>', '>', '>', null, '>', null, null],
    ]);

    const [secondPass, secondPassMoveCount] = updateSeaFloor(firstPass);
    expect(secondPassMoveCount).toBe(2);
    expect(secondPass).toStrictEqual([
      [null, null, null, '>', '>', '>', null, '>', null, '>', null],
    ]);
  });

  it('moves sea cucumbers in two dimensions', () => {
    const seaFloor = parseSeaFloor(twoDimensionsSeaFloor);

    const [firstPass, firstPassMoveCount] = updateSeaFloor(seaFloor);

    expect(firstPassMoveCount).toBe(24);
    expect(firstPass).toStrictEqual([
      [null, null, null, null, '>', null, '>', 'v', null, '>'],
      ['v', null, 'v', '>', null, '>', 'v', null, 'v', null],
      ['>', 'v', '>', '>', null, null, '>', 'v', null, null],
      ['>', '>', 'v', '>', 'v', '>', null, '>', null, 'v'],
      [null, '>', 'v', null, 'v', null, null, null, 'v', null],
      ['v', '>', '>', null, '>', 'v', 'v', 'v', null, null],
      [null, null, 'v', null, null, null, '>', '>', null, null],
      ['v', 'v', null, null, null, '>', '>', 'v', 'v', null],
      ['>', null, 'v', null, 'v', null, null, 'v', null, 'v'],
    ]);

    const [secondPass, secondPassMoveCount] = updateSeaFloor(firstPass);
    expect(secondPassMoveCount).toBe(24);
    expect(secondPass).toStrictEqual([
      ['>', null, 'v', null, 'v', '>', '>', null, null, 'v'],
      ['v', null, 'v', null, '>', '>', 'v', 'v', null, null],
      ['>', 'v', '>', null, '>', null, '>', null, 'v', null],
      ['>', '>', 'v', '>', 'v', null, '>', 'v', '>', null],
      [null, '>', null, null, 'v', null, null, null, null, 'v'],
      [null, '>', 'v', '>', '>', null, 'v', null, 'v', null],
      ['v', null, null, null, null, 'v', '>', 'v', '>', null],
      [null, 'v', 'v', null, null, '>', '>', 'v', null, null],
      ['v', '>', null, null, null, null, null, 'v', 'v', null],
    ]);
  });
});

describe('printSeaFloor', () => {
  it('prints the sea floor to look like an input', () => {
    expect(printSeaFloor(parseSeaFloor(oneDimensionSeaFloor))).toBe(
      oneDimensionSeaFloor,
    );

    expect(printSeaFloor(parseSeaFloor(twoDimensionsSeaFloor))).toBe(
      twoDimensionsSeaFloor,
    );
  });
});
