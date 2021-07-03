const px = {
  defaultValue: 0,
  asUnit: (v: number) => v + "px",
}

const scale = {
  defaultValue: 1,
  asUnit: (v: number) => v,
}

const valueTypes = {
  scale,
  scaleX: scale,
  scaleY: scale,
}

export const getDefaultValueType = (key: string) => valueTypes[key] || px
