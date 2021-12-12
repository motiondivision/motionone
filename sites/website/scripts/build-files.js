// TODO Move minified file into public
const path = require("path")
const { readFile, writeFile } = require("fs/promises")

async function buildFiles() {
  const motionDir = path.join(
    __dirname,
    "../",
    "../",
    "../",
    "node_modules",
    "motion"
  )
  const pagesDir = path.join(__dirname, "../", "pages")

  /**
   * Copy latest motion into static files
   */
  const motion = await readFile(
    path.join(motionDir, "dist", "motion.min.js"),
    "utf8"
  )
  await writeFile(
    path.join(__dirname, "../", "public", "scripts", "motion.min.js"),
    motion
  )

  /**
   * Pretty up changelog and copy into mdx file
   */
  let changelog = await readFile(
    path.join(__dirname, "../", "../", "../", "CHANGELOG.md"),
    "utf8"
  )

  changelog = changelog.replace("# Changelog\n", "")
  changelog = changelog.replace(/## \[/g, "---\n#### [")
  changelog = changelog.replace(new RegExp("## Added", "g"), "#### ⭐️ Added")
  changelog = changelog.replace(new RegExp("## New", "g"), "#### ⭐️ New")
  changelog = changelog.replace(
    new RegExp("## Changed", "g"),
    "#### 🚦 Changed"
  )
  changelog = changelog.replace(new RegExp("## Fixed", "g"), "#### 🐞 Fixed")

  changelog = changelog.replace(/\[\d+\.\d+\.\d+\]/g, (match) => {
    return `<Version>${removeBrackets(match)}</Version>`
  })

  changelog = changelog.replace(/\[\d+-\d+-\d+\]/g, (match) => {
    const date = new Date(removeBrackets(match))
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "2-digit",
    }).format(date)
    return `<Date>${formattedDate}</Date>`
  })

  changelog = changelogTemplate(changelog)

  await writeFile(path.join(pagesDir, "changelog.mdx"), changelog)

  console.log("Built changelog")
}

buildFiles()

function changelogTemplate(content) {
  return `
import { AuthDocTemplate } from "../components/AuthDocTemplate";
import { Version, Date } from "../components/template/changelog";
export default AuthDocTemplate;

export const meta = {
  title: "Changelog",
  description: "Keep up-to-date with the latest updates in Motion One",
  needsSponsorship: true,
  showContents: false,
  shareImage: "social/share-changelog.png",
};

${content}
  `
}

function removeBrackets(string) {
  string = string.replace("[", "")
  string = string.replace("]", "")
  return string
}
