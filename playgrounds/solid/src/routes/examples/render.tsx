import { Motion } from "../../../../../packages/solid/src/index"

export default function Render() {
  return (
    <Motion.Div
      initial={{ opacity: 0.6 }}
      style={{ width: "200px", "background-color": "red", height: "200px" }}
    />
  )
}
