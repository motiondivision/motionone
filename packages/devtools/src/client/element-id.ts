let counter = 0

function generateElementId(element: HTMLElement) {
  if (element.id) return `#${element.id}`

  counter++
  return element.tagName.toLowerCase() + " " + counter
}

export function getElementId(element: HTMLElement) {
  let motionId = element.dataset.motionId

  if (!motionId) {
    element.dataset.motionId = motionId = generateElementId(element)
  }

  return motionId
}
