import Link from "next/link"
import styled from "styled-components"
import { CopyIcon } from "../icons/Copy"
import { Play } from "../icons/Play"
import { useClipboard } from "use-clipboard-copy"
import { HomepageAnimation } from "./HomepageAnimation"
import { useCallback } from "react"
import { Tick } from "../icons/Tick"
import { AnimatePresence } from "framer-motion"

export function HomepageHeader() {
  return (
    <Container>
      <Header>
        <Title>Motion One</Title>
      </Header>
      <Masthead>
        <Tag>
          <TagLine>
            Tiny size.
            <br />
            Huge performance.
          </TagLine>
          <Blurb>
            A new animation library, built on the Web Animations API for the
            smallest filesize and the fastest performance.
          </Blurb>
          <CTAContainer>
            <CopyInstallLink />
            <Link href="/guides/quick-start" passHref>
              <MainCTA>
                Quick start
                <Play />
              </MainCTA>
            </Link>
          </CTAContainer>
        </Tag>
        <HomepageAnimation />
      </Masthead>
    </Container>
  )
}

function CopyInstallLink() {
  const clipboard = useClipboard({ copiedTimeout: 1000 })

  const copy = useCallback(() => {
    clipboard.copy("npm install motion")
  }, [clipboard.copy])

  return (
    <CodeContainer>
      <code>npm install motion</code>
      <button onClick={copy}>
        <AnimatePresence exitBeforeEnter>
          {clipboard.copied ? (
            <Tick
              style={{ position: "relative", top: 2 }}
              color="var(--white)"
            />
          ) : (
            <CopyIcon />
          )}
        </AnimatePresence>
      </button>
    </CodeContainer>
  )
}

const largeScreen = "1080px"
const mediumScreen = "800px"
const smallScreen = "640px"

const Container = styled.div`
  --h-padding: 45px;
  --v-padding: 30px;
  background-color: var(--primary);
  padding: var(--v-padding) var(--h-padding);
  color: var(--background);
  overflow: hidden;
  --max-width: 1200px;

  @media (max-width: ${mediumScreen}) {
    --h-padding: 20px;
    --v-padding: 20px;
  }
`

const Header = styled.header`
  border-bottom: 1px solid var(--background);
  padding-bottom: var(--v-padding);
  margin: 0 auto;
  max-width: var(--max-width);
`

const Title = styled.h1`
  font-size: 24px;
  line-height: 24px;
  letter-spacing: -0.8px;
  margin: 0;
  padding: 0;

  @media (max-width: ${mediumScreen}) {
    font-size: 18px;
    line-height: 18px;
  }
`

const Masthead = styled.div`
  margin: 0 auto;
  max-width: var(--max-width);
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;

  @media (max-width: ${largeScreen}) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${mediumScreen}) {
    margin-top: 50px;
  }
`

const Tag = styled.div`
  position: relative;
  z-index: 2;
  background: linear-gradient(
    99deg,
    var(--primary) 0%,
    var(--primary) 90%,
    #fff20800 95%
  );
  padding-right: 40px;

  @media (max-width: 1080px) {
    background: none;
    padding-right: 0;
  }
`

const TagLine = styled.h2`
  font-size: 56px;
  letter-spacing: -3px;
  line-height: 1.2;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;

  @media (max-width: ${mediumScreen}) {
    font-size: 42px;
    letter-spacing: -2px;
  }

  @media (max-width: ${smallScreen}) {
    font-size: 28px;
    letter-spacing: -0.8px;
  }
`

const Blurb = styled.p`
  font-size: 22px;
  letter-spacing: -0.8px;
  line-height: 1.4;
  font-weight: 700;
  margin-bottom: 40px;

  @media (max-width: ${smallScreen}) {
    font-size: 18px;
    letter-spacing: -0.6px;
  }
`

export const MainCTA = styled.a`
  background-color: var(--secondary);
  font-size: 24px;
  letter-spacing: -0.8px;
  line-height: 1;
  font-weight: 700;
  color: var(--white);
  text-decoration: none;
  border-radius: var(--action-radius);
  padding: var(--cta-padding);
  display: flex;
  align-items: center;

  svg {
    margin-left: 10px;
  }

  @media (max-width: ${smallScreen}) {
    font-size: 18px;
    svg {
      transform: scale(0.8);
    }
  }
`

const CTAContainer = styled.div`
  display: flex;
  --cta-padding: 15px 20px;
  margin-bottom: 80px;

  @media (max-width: ${largeScreen}) {
    margin-bottom: 20px;
  }
`

const CodeContainer = styled.div`
  background: var(--background);
  color: var(--foreground);
  margin-right: 10px;
  border-radius: var(--action-radius);
  padding: var(--cta-padding);
  display: flex;
  align-items: center;

  button {
    margin-left: 15px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: ${smallScreen}) {
    display: none;
  }
`
