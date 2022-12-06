import { getMarkerPosition, PACKET_MARKER_SIZE, MESSAGE_MARKER_SIZE } from '.';

const testDataStreams: [
  stream: string,
  packetMarkerPos: number,
  packetMessagePos: number,
][] = [
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7, 19],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5, 23],
  ['nppdvjthqldpwncqszvftbrmjlhg', 6, 23],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10, 29],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11, 26],
];

describe('getStartOfPacketMarkerPosition', () => {
  it('finds the start-of-packet marker position', () => {
    for (const [stream, packetMarkerPos] of testDataStreams) {
      expect(getMarkerPosition(stream.split(''), PACKET_MARKER_SIZE)).toBe(
        packetMarkerPos,
      );
    }
  });
});

describe('getStartOfPacketMessage', () => {
  it('finds the start-of-packet message position', () => {
    for (const [stream, , packetMessagePos] of testDataStreams) {
      expect(getMarkerPosition(stream.split(''), MESSAGE_MARKER_SIZE)).toBe(
        packetMessagePos,
      );
    }
  });
});
