// import { spring } from "../"

// function sampleKeyframes(keyframes: any[]) {
//   const sampled: any[] = []
//   for (let i = 0; i < keyframes.length; i++) {
//     // Return every 5th keyframe
//     if (i % 5 === 1) sampled.push(keyframes[i])
//   }
//   return sampled
// }

describe("spring", () => {
  // test("It returns false if provided more than two keyframes", () => {
  //   const generator = spring()
  //   const output = generator.generate([0, 1, 2])
  //   expect(output).toEqual(false)
  // })

  test("", () => {})

  // test("It generates numerical springs when provided two keyframes", () => {
  //   const generator = spring()
  //   const output = generator.generate([50, 100])

  //   if (output === false) {
  //     throw new Error("Failed to generate animation")
  //   }

  //   const keyframes = sampleKeyframes(output.keyframes)

  //   expect(keyframes).toEqual([
  //     50.47512542830164,
  //     62.87737303698321,
  //     81.2636883932232,
  //     96.27178025522505,
  //     104.61927679539447,
  //     107.00347076104701,
  //     105.76619740747881,
  //     103.23581117475214,
  //     100.94854034606213,
  //     99.54800273707014,
  //     99.03897278069479,
  //     99.12284541810497,
  //     99.45848060479734,
  //     99.7997719675878,
  //     100.02855827697671,
  //     100.12699161129706,
  //     100.13063190356102,
  //   ])

  //   expect(output.duration).toEqual(860)

  //   const generatorWithSettings = spring(100, 10, 2)
  //   const settingsOutput = generatorWithSettings.generate([0, 100])

  //   if (settingsOutput === false) {
  //     throw new Error("Failed to generate animation")
  //   }

  //   const settingsKeyframes = sampleKeyframes(settingsOutput.keyframes)
  //   expect(keyframes).not.toEqual(settingsKeyframes)
  // })

  // test("It generates numerical springs, resuming from the current value", () => {})

  // test("It generates interpolated springs, when provided 2 string unit keyframes", () => {
  //   const generator = spring()
  //   const output = generator.generate(["50px", "100px"])

  //   if (output === false) {
  //     throw new Error("Failed to generate animation")
  //   }

  //   const keyframes = sampleKeyframes(output.keyframes)

  //   expect(keyframes).toEqual([
  //     0.9502508566032759,
  //     25.754746073966416,
  //     62.52737678644642,
  //     92.54356051045012,
  //     109.23855359078894,
  //     114.00694152209402,
  //     111.53239481495763,
  //     106.47162234950427,
  //     101.89708069212425,
  //     99.09600547414026,
  //     98.0779455613896,
  //     98.24569083620995,
  //     98.91696120959467,
  //     99.5995439351756,
  //     100.05711655395342,
  //     100.25398322259412,
  //     100.26126380712205,
  //     100.1765332612175,
  //   ])

  //   expect(output.duration).toEqual(860)

  //   const generatorWithSettings = spring(100, 10, 2)
  //   const settingsOutput = generatorWithSettings.generate(["50px", "100px"])

  //   if (settingsOutput === false) {
  //     throw new Error("Failed to generate animation")
  //   }

  //   const settingsKeyframes = sampleKeyframes(settingsOutput.keyframes)
  //   expect(keyframes).not.toEqual(settingsKeyframes)
  // })

  // test("It generates interpolated springs, when provided 2 color keyframes", () => {
  //   const generator = spring()
  //   const output = generator.generate(["#fff", "#000"])

  //   if (output === false) {
  //     throw new Error("Failed to generate animation")
  //   }

  //   const keyframes = sampleKeyframes(output.keyframes)

  //   expect(keyframes).toEqual([
  //     0.9502508566032759,
  //     25.754746073966416,
  //     62.52737678644642,
  //     92.54356051045012,
  //     109.23855359078894,
  //     114.00694152209402,
  //     111.53239481495763,
  //     106.47162234950427,
  //     101.89708069212425,
  //     99.09600547414026,
  //     98.0779455613896,
  //     98.24569083620995,
  //     98.91696120959467,
  //     99.5995439351756,
  //     100.05711655395342,
  //     100.25398322259412,
  //     100.26126380712205,
  //     100.1765332612175,
  //   ])

  //   expect(output.duration).toEqual(860)

  //   const generatorWithSettings = spring(100, 10, 2)
  //   const settingsOutput = generatorWithSettings.generate(["#fff", "#000"])

  //   if (settingsOutput === false) {
  //     throw new Error("Failed to generate animation")
  //   }

  //   const settingsKeyframes = sampleKeyframes(settingsOutput.keyframes)
  //   expect(keyframes).not.toEqual(settingsKeyframes)
  // })

  // test("It generates interpolated springs, when provided 2 transforms", () => {
  //   const generator = spring()
  //   const output = generator.generate([
  //     "translateX(100px) scale(1)",
  //     "translateX(0px) scale(2)",
  //   ])

  //   if (output === false) {
  //     throw new Error("Failed to generate animation")
  //   }

  //   const keyframes = sampleKeyframes(output.keyframes)

  //   expect(keyframes).toEqual([
  //     0.9502508566032759,
  //     25.754746073966416,
  //     62.52737678644642,
  //     92.54356051045012,
  //     109.23855359078894,
  //     114.00694152209402,
  //     111.53239481495763,
  //     106.47162234950427,
  //     101.89708069212425,
  //     99.09600547414026,
  //     98.0779455613896,
  //     98.24569083620995,
  //     98.91696120959467,
  //     99.5995439351756,
  //     100.05711655395342,
  //     100.25398322259412,
  //     100.26126380712205,
  //     100.1765332612175,
  //   ])

  //   expect(output.duration).toEqual(860)

  //   const generatorWithSettings = spring(100, 10, 2)
  //   const settingsOutput = generatorWithSettings.generate([
  //     "translateX(100px) scale(1)",
  //     "translateX(0px) scale(2)",
  //   ])

  //   if (settingsOutput === false) {
  //     throw new Error("Failed to generate animation")
  //   }

  //   const settingsKeyframes = sampleKeyframes(settingsOutput.keyframes)
  //   expect(keyframes).not.toEqual(settingsKeyframes)
  // })

  // test("It generates interpolated springs, resuming from the current value", () => {})
})
