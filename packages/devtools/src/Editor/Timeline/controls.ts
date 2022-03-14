const opacity = (initialValue: string) => ({
  value: parseFloat(initialValue),
  min: 0,
  max: 1,
  step: 0.05,
})

const controlTypes = {
  opacity,
}

export function createControls(name: string, value: string) {
  const factory = controlTypes[name]
  const config = factory ? factory(value) : { value }
  return {
    ...config,
    label: name,
    transient: true,
  }
}
