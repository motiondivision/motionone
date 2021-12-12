import { useState } from "react"
import { SandboxContent, SandboxProps } from "./types"
import { TabBar } from "./TabBar"
import { CodeBlock } from "../../template/tagsCode"
import styled from "styled-components"
import { useSession, signIn } from "next-auth/client"
import { animated } from "../../animated"
import { showSideNavWidth } from "../vars"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
`

const CodeContainer = styled.code`
  padding: 0 var(--padding);
  display: block;
  font-size: 14px;
  overflow-y: auto;
  flex: 1 1 auto;

  .editable-text {
    outline: none;
  }
`

function Code({
  content,
  selectedTab,
  onChange,
}: {
  content: string
  selectedTab: string
  onChange: (val: string) => void
}) {
  return (
    <CodeContainer>
      <CodeBlock language={languages[selectedTab]} onChange={onChange}>
        {content}
      </CodeBlock>
    </CodeContainer>
  )
}

interface Props {
  setContent: (content: SandboxContent) => void
}

export function Editor({
  content,
  setContent,
  showTabs,
  authEdit = false,
}: Props & SandboxProps) {
  const [selectedTab, setTab] = useState("js")
  const [session, isLoading] = useSession()

  const canEdit = !authEdit || session
  const showLogin = !isLoading && !session && authEdit

  const onChange = canEdit
    ? (latest: string) => {
        const newContent = { ...content }
        newContent[selectedTab] = latest
        setContent(newContent)
      }
    : undefined

  return (
    <Container>
      {showTabs ? (
        <TabBar
          selectedTab={selectedTab}
          setTab={setTab}
          tabs={["js", "html", "css"]}
        />
      ) : null}
      <Code
        selectedTab={selectedTab}
        content={content[selectedTab] + " "}
        onChange={onChange as any}
      />
      {showLogin && <LoginPopup />}
    </Container>
  )
}

const languages = {
  js: "language-javascript",
  css: "language-css",
  html: "language-markup",
}

const LoginPopupContainer = styled(animated.div)`
  position: absolute;
  bottom: var(--padding);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1;

  @media (max-width: ${showSideNavWidth}) {
    left: var(--padding);
    right: 100px;
  }
`

const LoginModal = styled(animated.div)`
  background: var(--feint-solid);
  color: var(--foreground);
  font-size: 16px;
  border-radius: 40px;
  padding: 15px 18px;
  display: flex;
  align-items: center;

  @media (max-width: ${showSideNavWidth}) {
    font-size: 14px;
  }

  div {
    width: 16px;
    height: 16px;
    background: var(--green);
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
  }

  a,
  button {
    color: var(--foreground);
    text-decoration: underline;
    font-size: 16px;
    font-weight: 400;
    margin-left: 20px;

    @media (max-width: ${showSideNavWidth}) {
      font-size: 14px;
    }
  }

  div,
  span {
    @media (max-width: ${showSideNavWidth}) {
      display: none;
    }
  }

  a {
    @media (max-width: ${showSideNavWidth}) {
      margin-left: 0;
    }
  }
`

const LoginPopup = () => (
  <LoginPopupContainer
    initial={{ transform: "scale(0.6)", opacity: 0 }}
    style={{ transform: "none", opacity: 1 }}
    options={{ easing: [0, 0.49, 0.24, 0.98], duration: 0.5 }}
  >
    <LoginModal>
      <div />
      <span>Login to enable live editing</span>
      <button onClick={() => signIn("github")}>Login</button>
      <a href="https://github.com/sponsors/mattgperry">Become a sponsor</a>
    </LoginModal>
  </LoginPopupContainer>
)
