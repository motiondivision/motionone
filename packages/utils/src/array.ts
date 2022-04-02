export function addUniqueItem<T>(array: T[], item: T) {
  array.indexOf(item) === -1 && array.push(item)
}

export function removeItem<T>(arr: T[], item: T) {
  const index = arr.indexOf(item)
  index > -1 && arr.splice(index, 1)
}
