export function calculateMagnitude(snailNumber: string): number {
  const value = JSON.parse(snailNumber);

  if (Array.isArray(value)) {
    return (
      3 * calculateMagnitude(JSON.stringify(value[0])) +
      2 * calculateMagnitude(JSON.stringify(value[1]))
    );
  } else {
    return value;
  }
}
