import type { Packet } from '.';

export function parsePacket(packet: string): Packet {
  const packetVersion = parseInt(packet.slice(0, 3), 2);
  const packetType = parseInt(packet.slice(3, 6), 2);

  if (packetType === 4) {
    const packetChunks = packet.slice(6).match(/.{1,5}/g) ?? [];
    let packetSize = 6;
    let packetValue = '';
    for (let i = 0; i < packetChunks.length; i++) {
      packetSize += 5;
      packetValue += packetChunks[i].slice(1);
      if (packetChunks[i].startsWith('0')) {
        break;
      }
    }

    return {
      version: packetVersion,
      type: packetType,
      size: packetSize,
      value: parseInt(packetValue, 2),
      subPackets: [],
    };
  } else {
    let packetLength: number;
    const subPackets: Packet[] = [];

    const lengthType = packet.charAt(6);

    if (lengthType === '0') {
      const offset = 22;
      const subPacketsLength = parseInt(packet.slice(7, offset), 2);

      packetLength = offset + subPacketsLength;

      let i = 0;
      while (i < subPacketsLength) {
        const subPacket = parsePacket(packet.slice(22 + i));

        subPackets.push(subPacket);

        i += subPacket.size;
      }
    } else {
      let offset = 18;
      const subpacketCount = parseInt(packet.slice(7, offset), 2);

      for (let i = 0; i < subpacketCount; i++) {
        const subPacket = parsePacket(packet.slice(offset));

        subPackets.push(subPacket);

        offset += subPacket.size;
      }

      packetLength = offset;
    }

    const base: Omit<Packet, 'value'> = {
      version: packetVersion,
      type: packetType,
      size: packetLength,
      subPackets,
    };

    const values = subPackets.map((subPacket) => subPacket.value);

    switch (packetType) {
      case 0:
        return { ...base, value: values.reduce((a, b) => a + b) };
      case 1:
        return { ...base, value: values.reduce((a, b) => a * b) };
      case 2:
        return { ...base, value: values.reduce((a, b) => Math.min(a, b)) };
      case 3:
        return { ...base, value: values.reduce((a, b) => Math.max(a, b)) };
      case 5:
        return { ...base, value: values[0] > values[1] ? 1 : 0 };
      case 6:
        return { ...base, value: values[0] < values[1] ? 1 : 0 };
      case 7:
        return { ...base, value: values[0] === values[1] ? 1 : 0 };
      default:
        throw new Error('Unknown packet type');
    }
  }
}
