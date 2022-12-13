import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { sumArray } from '@/lib/sumArray';
import { z } from 'zod';
import { checkPacketsAreInCorrectOrder } from './checkPacketsAreInCorrectOrder';

export type RecursivePacketData = (number | RecursivePacketData)[];
const recursivePacketSchema: z.ZodType<RecursivePacketData> = z.lazy(() =>
  z.array(z.union([z.number(), recursivePacketSchema])),
);

function partOne(packetPairs: [RecursivePacketData, RecursivePacketData][]) {
  const validPairIndices: number[] = [];

  for (const [index, [firstPacket, secondPacket]] of packetPairs.entries()) {
    const result = checkPacketsAreInCorrectOrder(firstPacket, secondPacket);

    if (result === true) {
      validPairIndices.push(index + 1);
    }
  }

  return sumArray(validPairIndices);
}

function partTwo(packets: RecursivePacketData[]) {
  const dividerPackets = [[[2]], [[6]]];

  const sortedPackets = packets
    .concat(dividerPackets)
    .sort((a, b) => {
      const result = checkPacketsAreInCorrectOrder(a, b);

      return result === true ? -1 : 1;
    })
    .map((packet) => JSON.stringify(packet));

  return (
    (sortedPackets.indexOf(JSON.stringify(dividerPackets[0])) + 1) *
    (sortedPackets.indexOf(JSON.stringify(dividerPackets[1])) + 1)
  );
}

async function main() {
  const input = await getInput(__dirname);

  const packetPairs = z
    .array(z.tuple([recursivePacketSchema, recursivePacketSchema]))
    .parse(
      input
        .split('\n\n')
        .map((pair) =>
          pair.split('\n').map((packet) => JSON.parse(packet) as unknown),
        ),
    );

  const packets = z.array(recursivePacketSchema).parse(
    input
      .split('\n\n')
      .join('\n')
      .split('\n')
      .map((packet) => JSON.parse(packet) as unknown),
  );

  void runDay(
    2022,
    13,
    'Distress Signal',
    () => partOne(packetPairs),
    () => partTwo(packets),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
