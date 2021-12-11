/**
 * Define which modules to transpile from node_modules.
 */
const withTM = require("next-transpile-modules")(["motion"]);

module.exports = withTM({
  reactStrictMode: true,
});
