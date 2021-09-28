// import { makeAnimatable } from "../value-types"

// function assertUnitType(
//   from: string | number,
//   to: string | number,
//   check: number,
//   expected: string
// ) {
//   const animatable = makeAnimatable(from, to)
//   expect(animatable).not.toEqual(false)
//   if (animatable === false) return

//   expect(animatable.from).toEqual(
//     typeof from === "string" ? parseFloat(from) : from
//   )
//   expect(animatable.to).toEqual(typeof to === "string" ? parseFloat(to) : to)
//   expect(animatable.toValueType?.(check)).toEqual(expected)
// }

// function assetInterpolatedType(
//   from: string,
//   to: string,
//   check: number,
//   expected: string
// ) {
//   const animatable = makeAnimatable(from, to)
//   expect(animatable).not.toEqual(false)
//   if (animatable === false) return

//   expect(animatable.from).toEqual(0)
//   expect(animatable.to).toEqual(100)
//   expect(animatable.toValueType?.(check)).toEqual(expected)
// }

describe("makeAnimatable", () => {
  it("Returns animatable versions of provided values", () => {
    // expect(makeAnimatable(0, 50)).toEqual({ from: 0, to: 50 })
    // expect(makeAnimatable("0", 50)).toEqual({ from: 0, to: 50 })
    // expect(makeAnimatable(0, "50")).toEqual({ from: 0, to: 50 })
    // expect(makeAnimatable(0, "#fff")).toEqual(false)
    // assertUnitType(0, "50px", 25, "25px")
    // assertUnitType(0, "50vw", 25, "25vw")
    // assertUnitType(100, "50vw", 25, "25vw")
    // assetInterpolatedType("#fff", "#000", 50, "rgba(180, 180, 180, 1)")
    // assetInterpolatedType(
    //   "translateX(10px) scale(1)",
    //   "translateX(20px) scale(2)",
    //   50,
    //   "translateX(15px) scale(1.5)"
    // )
  })
})
