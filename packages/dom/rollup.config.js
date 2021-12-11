const config = require("config/rollup.config")
const pkg = require("./package.json")
module.exports = config(pkg)
