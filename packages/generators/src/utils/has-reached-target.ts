export function hasReachedTarget(
  origin: number,
  target: number,
  current: number
) {
  return (
    (origin < target && current >= target) ||
    (origin > target && current <= target)
  )
}
