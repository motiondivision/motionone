/**
 * Define which modules to transpile from node_modules.
 */

const mdxRenderer = `
 import React from 'react'
 import { mdx } from '@mdx-js/react'
 import fs from "fs"
 import path from "path"
 import process from "process"

 export async function getStaticProps () {
   let version = ''
   const motionPackageJson = fs.readFileSync(path.join(process.cwd(), 'node_modules', 'motion', 'package.json'), "utf8")

   if (motionPackageJson) {
     version = JSON.parse(motionPackageJson).version
   }

   return {
     props: {
       version
     }
   }
 }
`

const toc = require("@jsdevtools/rehype-toc")

const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
  options: {
    // remarkPlugins: [require("remark-sectionize")],
    rehypePlugins: [require("rehype-slug"), [toc, { headings: ["h1", "h2"] }]],
    renderer: mdxRenderer,
  },
})

const withTM = require("next-transpile-modules")(["motion"])

module.exports = {
  ...withMDX,
  ...withTM({ reactStrictMode: true }),
}
