import { createStyleString } from "../style-string"

describe("createStyleString", () => {
  test("Creates a style string", () => {
    expect(
      createStyleString({
        backgroundColor: "red",
        "--translateX": "100px",
      })
    ).toEqual("background-color: red;--translateX: 100px;")
  })
})
