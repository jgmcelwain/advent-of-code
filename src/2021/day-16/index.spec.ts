import { convertHexToBinaryString } from './convertHexToBinaryString';
import { parsePacket } from './parsePacket';
import { sumPacketVersions } from './sumPacketVersions';

describe('convertHexToBinaryString', () => {
  it.each([
    { hex: '1A', binary: '00011010' },
    { hex: 'D2FE28', binary: '110100101111111000101000' },
    {
      hex: '38006F45291200',
      binary: '00111000000000000110111101000101001010010001001000000000',
    },
    {
      hex: 'EE00D40C823060',
      binary: '11101110000000001101010000001100100000100011000001100000',
    },
  ])(
    'converts a hex string to its binary representation',
    ({ hex, binary }) => {
      expect(convertHexToBinaryString(hex)).toBe(binary);
    },
  );
});

describe('parsePacket', () => {
  it.each([
    { hex: 'C200B40A82', value: 3 },
    { hex: '04005AC33890', value: 54 },
    { hex: '880086C3E88112', value: 7 },
    { hex: 'CE00C43D881120', value: 9 },
    { hex: 'D8005AC2A8F0', value: 1 },
    { hex: 'F600BC2D8F', value: 0 },
    { hex: '9C005AC2F8F0', value: 0 },
    { hex: '9C0141080250320F1802104A08', value: 1 },
  ])('takes a packet string and parses its value', ({ hex, value }) => {
    expect(parsePacket(convertHexToBinaryString(hex)).value).toEqual(value);
  });
});

describe('sumPacketVersions', () => {
  it.each([
    { hex: '8A004A801A8002F478', sum: 16 },
    { hex: '620080001611562C8802118E34', sum: 12 },
    { hex: 'C0015000016115A2E0802F182340', sum: 23 },
    { hex: 'A0016C880162017C3686B18A3D4780', sum: 31 },
  ])(
    'adds up the version number of a packet and its subpackets',
    ({ hex, sum }) => {
      const packet = parsePacket(convertHexToBinaryString(hex));
      const versionSum = sumPacketVersions(packet);
      expect(versionSum).toBe(sum);
    },
  );
});
