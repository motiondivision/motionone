import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import replace from "@rollup/plugin-replace"

export default ["background", "bridge", "editor", "devtools", "client"].map(
  (name) => ({
    input: `lib/${name}.js`,
    output: [
      {
        format: name === "bridge" || name === "client" ? "iife" : "es",
        file: `app/js/${name}.js`,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
  })
)
