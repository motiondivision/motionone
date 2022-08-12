export function getUnit(value: string): string {
  return value.match(/(-?[\d.]+)([a-z%]*)/)?.[2] || ""
}
