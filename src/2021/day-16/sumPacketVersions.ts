import type { Packet } from '.';

export function sumPacketVersions(packet: Packet): number {
  let versionSum = packet.version;

  versionSum += packet.subPackets.reduce(
    (acc, subPacket) => acc + sumPacketVersions(subPacket),
    0,
  );

  return versionSum;
}
