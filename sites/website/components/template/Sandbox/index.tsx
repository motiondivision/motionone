import styled from "styled-components"
import { useEffect, useState } from "react"
import { Editor } from "./Editor"
import { Preview } from "./Preview"
import { SandboxProps } from "./types"

const SandboxContainer = styled.div`
  margin: var(--padding) calc(1px - var(--padding)) calc(var(--padding) * 2);
  border: 1px solid var(--feint);
  border-radius: var(--action-radius);
  overflow: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
  height: 300px;

  @media (max-width: 650px) {
    grid-template-columns: none;
    grid-template-rows: 200px 200px;
    border-radius: 0px;
    border-left: none;
    border-right: none;
    height: 400px;
  }
`

export function Sandbox({
  content: initialContent,
  showTabs = true,
  autoplay,
  authEdit,
}: SandboxProps) {
  const [content, setContent] = useState(initialContent)
  const [debouncedContent, setDebouncedContent] = useState(content)

  useEffect(() => {
    if (content === debouncedContent) return

    const updateDebouncedContent = setTimeout(
      () => setDebouncedContent(content),
      500
    )

    return () => clearTimeout(updateDebouncedContent)
  }, [content])

  return (
    <SandboxContainer>
      <Editor
        content={content}
        setContent={setContent}
        authEdit={authEdit}
        showTabs={showTabs}
      />
      <Preview content={debouncedContent} autoplay={autoplay} />
    </SandboxContainer>
  )
}

const FullscreenContainer = styled.div`
  flex-grow: 1;
  min-height: 0;
  position: relative;

  ${SandboxContainer} {
    border-radius: 0;
    border: none;
    border-top-width: 1px;
    margin: 0;
    position: absolute;
    inset: 0;
    height: 100%;
    max-height: 100%;

    @media (max-width: 650px) {
      grid-template-columns: none;
      grid-template-rows: 0.5fr 0.5fr;
    }
  }
`

export function FullscreenSandbox(props: SandboxProps) {
  return (
    <FullscreenContainer>
      <Sandbox {...props} autoplay authEdit />
    </FullscreenContainer>
  )
}

export function InlineSandbox(props: SandboxProps) {
  return (
    <div>
      <Sandbox {...props} />
    </div>
  )
}
