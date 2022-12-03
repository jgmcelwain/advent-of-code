// offsets that convert a character's charCode to a priority value (a-z = 1-26, A-Z = 27-52)
const LOWER_CASE_OFFSET = 96;
const UPPER_CASE_OFFSET = 38;

export function getItemPriority(item: string) {
  return (
    item.charCodeAt(0) -
    (item.toLowerCase() === item ? LOWER_CASE_OFFSET : UPPER_CASE_OFFSET)
  );
}
