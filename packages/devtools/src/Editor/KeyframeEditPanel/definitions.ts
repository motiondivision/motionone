const opacity = (initialValue: string) => ({
  value: parseFloat(initialValue),
  min: 0,
  max: 1,
  step: 0.05,
})

const controlDefinitions = {
  opacity,
}

export function getControlDefinition(name: string, value: string) {
  const factory = controlDefinitions[name]
  const config = factory ? factory(value) : { value }
  return {
    ...config,
    label: name,
    transient: true,
  }
}
