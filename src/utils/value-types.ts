// export const floatRegex = /(-)?([\d]*\.?[\d])+/g
// export const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi

// export function parseNumberString(value: string | number) {
//   if (typeof value === "string" && parseFloat(value).toString() === value) {
//     return parseFloat(value)
//   }
//   return value
// }

// export const getUnit = (v: string) => v.replace(floatRegex, "")

// export interface Animatable {
//   from: number
//   to: number
//   toValueType?: (v: number) => string
// }

// export function makeAnimatable(
//   from: string | number,
//   to: string | number
// ): Animatable | false {
//   from = parseNumberString(from)
//   to = parseNumberString(to)

//   // If both numbers, animate
//   if (typeof from === "number" && typeof to === "number") return { from, to }

//   // If one is a number and the other is a unit type
//   if (
//     typeof from === "number" &&
//     typeof to !== "number" &&
//     !isNaN(parseFloat(to))
//   ) {
//     const unit = getUnit(to)
//     return { from, to: parseFloat(to), toValueType: (v: number) => v + unit }
//   } else if (typeof from === "string") {
//     const mixer = mixComplex(from, to as string)
//     return {
//       from: 0,
//       to: 100,
//       toValueType: (v: number) => mixer(v / 100),
//     }
//   }

//   return false
// }
