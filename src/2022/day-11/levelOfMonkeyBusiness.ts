export function levelOfMonkeyBusiness(counts: Record<string, number>) {
  return Object.values(counts)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, curr) => acc * curr, 1);
}
