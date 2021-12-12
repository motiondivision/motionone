import React, { useEffect, useReducer } from "react"

interface ViewportState {
  isInViewport: boolean
  hasEnteredViewport: boolean
}

interface ViewportAction {
  isIntersecting: boolean
}

function viewportReducer(
  { hasEnteredViewport }: ViewportState,
  action: ViewportAction
): ViewportState {
  return {
    isInViewport: action.isIntersecting,
    hasEnteredViewport: action.isIntersecting || hasEnteredViewport,
  }
}

export function useInViewport(
  ref: React.RefObject<HTMLElement>
): ViewportState {
  const [state, dispatch] = useReducer(viewportReducer, {
    isInViewport: false,
    hasEnteredViewport: false,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      dispatch({ isIntersecting: entry.isIntersecting })
    })

    observer.observe(ref.current!)

    return () => observer.disconnect()
  }, [ref])

  return state
}
