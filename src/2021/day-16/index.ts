import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { convertHexToBinaryString } from './convertHexToBinaryString';
import { parsePacket } from './parsePacket';
import { sumPacketVersions } from './sumPacketVersions';

export type Packet = {
  version: number;
  type: number;
  size: number;
  value: number;
  subPackets: Packet[];
};

function partOne(binaryInput: string) {
  const packet = parsePacket(binaryInput);
  const result = sumPacketVersions(packet);

  return result;
}

function partTwo(binaryInput: string) {
  const packet = parsePacket(binaryInput);

  return packet.value;
}

async function main() {
  const input = await getInput(__dirname);
  const binaryInput = convertHexToBinaryString(input);

  runDay(
    2021,
    16,
    'Packet Decoder',
    () => partOne(binaryInput),
    () => partTwo(binaryInput),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
