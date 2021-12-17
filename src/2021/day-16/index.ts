import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { convertHexToBinaryString } from './convertHexToBinaryString';

type Packet = {
  version: number;
  type: number;
  value: number;
  subPackets: string[];
};

function processPacket(packet: string): Packet {
  const version = parseInt(packet.slice(0, 3), 2);
  const packetType = parseInt(packet.slice(3, 6), 2);
  const data = packet.slice(6, packet.length);

  return { version, type: packetType, value: 1, subPackets: [] };
}

function partOne(binaryInput: string) {
  const { version, type, value, subPackets } = processPacket(binaryInput);
  console.log(version, type);
  return null;
}

function partTwo(binaryInput: string) {
  return null;
}

async function main() {
  // const input = await getInput(__dirname);
  const input = 'D2FE28';
  const binaryInput = convertHexToBinaryString(input).replace(/0+$/, '');

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
