const fs = require("fs")
const path = require("path")

const files = fs
  .readdirSync("./demos/animate")
  .filter((f) => path.extname(f) === ".html")

fs.writeFile(
  "./cypress/fixtures/tests.json",
  JSON.stringify(files),
  "utf8",
  (err) => {
    if (err) {
      return console.error("Fail to collect tests:", err.message)
    }

    console.log("Tests collected!")
  }
)
