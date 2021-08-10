import { NextTime } from "../types"

export function calcNextTime(
  current: number,
  next: NextTime,
  labels: Map<string, number>
): number {
  if (typeof next === "number") {
    return next
  } else if (next.startsWith("-") || next.startsWith("+")) {
    return current + parseFloat(next)
  } else {
    return labels.get(next) ?? current
  }
}
