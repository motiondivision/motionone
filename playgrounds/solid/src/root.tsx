// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";

export default function Root() {
  return (
    <>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </>
  );
}
