import { RecursivePacketData } from './index';

export function checkPacketsAreInCorrectOrder(
  firstPacket: RecursivePacketData,
  secondPacket: RecursivePacketData,
): boolean | undefined {
  const firstPacketDataToCheck = [...firstPacket];
  const secondPacketDataToCheck = [...secondPacket];

  // iterate whilst both packets have data in them left to check
  while (
    firstPacketDataToCheck.length > 0 &&
    secondPacketDataToCheck.length > 0
  ) {
    // get the first item from each packet
    const firstPacketItem = firstPacketDataToCheck.shift();
    const secondPacketItem = secondPacketDataToCheck.shift();

    // this shouldn't ever happen because of the condition of the while loop but
    // it's here to make the ts compiler happy
    if (firstPacketItem === undefined || secondPacketItem === undefined) {
      throw new Error();
    }

    // if both items are numbers then we should compare them directly
    if (
      typeof firstPacketItem === 'number' &&
      typeof secondPacketItem === 'number'
    ) {
      // if the two packet items are equal then we just need to go to the next
      // iteration of the loop in search of a pair that are not
      if (firstPacketItem === secondPacketItem) {
        continue;
      }

      // if the packet items aren't equal then we can know if the packets are in
      // the correct order - the item with the lower value should be in the
      // first packet
      else {
        return firstPacketItem < secondPacketItem;
      }
    }

    // at least one of the packetItems is an array so we should make sure they
    // are both arrays and then treat them as packets that should be checked
    else {
      const result = checkPacketsAreInCorrectOrder(
        Array.isArray(firstPacketItem) ? firstPacketItem : [firstPacketItem],
        Array.isArray(secondPacketItem) ? secondPacketItem : [secondPacketItem],
      );

      if (result !== undefined) return result;
    }
  }

  // if the first packet has run out of data but the second packet still has
  // data then the packets are in the correct order
  if (
    firstPacketDataToCheck.length === 0 &&
    secondPacketDataToCheck.length > 0
  ) {
    return true;
  }

  // if the second packet has run out of data but the first packet still has
  // data then the packets are not in the correct order
  else if (
    firstPacketDataToCheck.length > 0 &&
    secondPacketDataToCheck.length === 0
  ) {
    return false;
  }

  // if both packets have run out of data then we can't base the order on the
  // data we have so we should return undefined
  else {
    return undefined;
  }
}
