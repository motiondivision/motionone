export type MockIntersectionObserverEntry = {
  isIntersecting: boolean
}

export type MockIntersectionObserverCallback = (
  entries: MockIntersectionObserverEntry[]
) => void

let activeIntersectionObserver: MockIntersectionObserverCallback | undefined =
  undefined

export const getActiveObserver = () => activeIntersectionObserver

window.IntersectionObserver = class MockIntersectionObserver {
  callback: MockIntersectionObserverCallback

  constructor(callback: MockIntersectionObserverCallback) {
    this.callback = callback
  }

  observe(_element: Element) {
    activeIntersectionObserver = this.callback
  }

  unobserve(_element: Element) {
    activeIntersectionObserver = undefined
  }

  disconnect() {}
} as any
