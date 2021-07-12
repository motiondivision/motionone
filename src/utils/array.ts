export function addUniqueItem<T>(array: T[], item: T) {
  array.indexOf(item) === -1 && array.push(item)
}
