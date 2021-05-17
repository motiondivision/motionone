// import { Fragment, Sequence, Definition } from "./types"

// interface ElementMap {
//   [key: string]: Node | NodeList
// }

export function timeline() {
  //(...sequence: Sequence) {
  // const elements = sequence.reduce(scrapeElementsFromDefinition, {})
  // let currentPlayhead = 0
  // let duration = 0
  // sequence.forEach((fragment) => {
  //   if (typeof fragment === "string") {
  //     currentPlayhead += parseFloat(fragment)
  //   } else if (isDefinition(fragment)) {
  //   }
  // })
}

// function isDefinition(fragment: Fragment): fragment is Definition {
//   return typeof fragment[0] === "string"
// }

// function scrapeElementsFromDefinition(acc: ElementMap, fragment: Fragment) {
//   if (Array.isArray(fragment)) {
//     if (isDefinition(fragment)) {
//       const [selector] = fragment
//       if (!acc[selector]) {
//         acc[selector] = document.querySelectorAll(selector)
//       }
//     } else {
//       fragment.reduce(scrapeElementsFromDefinition as any, acc as any)
//     }
//   }

//   return acc
// }
