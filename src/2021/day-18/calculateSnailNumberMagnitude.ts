export function calculateSnailNumberMagnitude(snailNumber: string): number {
  const value = JSON.parse(snailNumber) as number | number[];

  if (Array.isArray(value)) {
    return (
      3 * calculateSnailNumberMagnitude(JSON.stringify(value[0])) +
      2 * calculateSnailNumberMagnitude(JSON.stringify(value[1]))
    );
  } else {
    return value;
  }
}
