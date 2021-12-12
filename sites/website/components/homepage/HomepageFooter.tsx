import styled from "styled-components"
import { MainCTA } from "./HomepageHeader"
import Link from "next/link"
import { Play } from "../icons/Play"
import { screenM } from "../template/vars"

export function HomepageFooter() {
  return (
    <Container>
      <p>Get started with Motion One's interactive quick start guide.</p>
      <Link passHref href="/guides/quick-start">
        <MainCTA>
          Quick start
          <Play />
        </MainCTA>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 100px;
  color: var(--background);
  background: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;

  p {
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    letter-spacing: -0.4px;
  }

  @media (max-width: ${screenM}) {
    font-size: 18px;
    line-height: 22px;
  }

  ${MainCTA} {
    margin-top: 10px;
    padding: 15px 18px;
  }
`
