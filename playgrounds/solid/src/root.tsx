// @refresh reload
import { Routes } from "solid-start/root"
import { ErrorBoundary } from "solid-start/error-boundary"
import { Portal } from "solid-js/web"

export default function Root() {
  return (
    <>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
      <Portal mount={document.body}>
        <a
          href="/"
          style={{
            position: "absolute",
            right: "16px",
            top: "16px",
          }}
        >
          ROOT
        </a>
      </Portal>
    </>
  )
}
