import { addUniqueItem } from "../array"

describe("addUniqueItem", () => {
  test("it only adds a unique item once", () => {
    const array: number[] = []
    addUniqueItem(array, 1)
    addUniqueItem(array, 2)
    addUniqueItem(array, 1)
    expect(array).toEqual([1, 2])
  })
})
