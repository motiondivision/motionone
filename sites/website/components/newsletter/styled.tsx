import styled from "styled-components"
import * as React from "react"
import { screenL, screenM } from "../template/vars"

export const H1 = styled.h1`
  font-size: 1.6rem;
  line-height: 2.8rem;
  text-transform: uppercase;
  color: var(--foreground);
  margin: 0;

  span {
    font-size: 5.6rem;
  }

  @media (max-width: ${screenM}) {
    font-size: 1.6rem;
    line-height: 2.4rem;
    span {
      font-size: 3.4rem;
    }
  }
`

export const ContentContainer = styled.div`
  width: 100%;
`

export const NavContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  @media (max-width: ${screenL}) {
    display: none;
  }
`

export const TOCContainer = styled.div`
  border-radius: 10px;
  border: 1px solid var(--feint);
  padding: var(--padding);
  margin-top: var(--padding);
  margin-bottom: calc(var(--padding) * 4);

  h2 {
    margin: 0;
    margin-top: 5px;
    margin-bottom: 2rem;
    font-size: 2.4rem;
    line-height: 2.4rem;
  }

  ul,
  ol,
  li {
    list-style: none;
    padding: 0;
    margin: 0;

    ol {
      padding-left: 20px;
    }
  }

  li {
    margin: 0.4rem 0;
  }

  a {
    color: var(--blue);
    /* text-decoration: underline; */
  }
`

export const TOC = ({ children }: any) => {
  return (
    <TOCContainer>
      <h2>Contents</h2>
      {children}
    </TOCContainer>
  )
}

export const BodyContainer = styled("div")<{ showContents?: boolean }>`
  --grid: [left] 1fr [gutter-left] var(--padding) [content-left]
    var(--max-body-width) [content-right] var(--padding) [gutter-right] 1fr
    [right];

  @media (max-width: 790px) {
    --grid: [left gutter-left] var(--padding) [content-left] 1fr [content-right]
      var(--padding) [gutter-right right];
  }

  display: grid;
  grid-template-columns: var(--grid);

  del {
    opacity: 0.4;
    margin-right: 0.2rem;
  }

  & > section {
    display: grid;
    grid-template-columns: var(--grid);
    grid-column-start: left;
    grid-column-end: right;
  }

  & > :not(section),
  & > section > * {
    grid-column-start: content-left;
    grid-column-end: content-right;
  }

  & > pre,
  & > section > pre {
    display: grid;
    grid-template-columns: var(--grid);
    grid-column: gutter-left / gutter-right;
    border-radius: 10px;
    background: var(--feint);
    padding: 7px;
    margin-bottom: 4rem;

    @media (max-width: 950px) {
      /* margin-left: 0;
      border-left: none; */
      border-radius: 0;
    }
  }

  & > pre > div,
  & > section > pre > div {
    grid-column: content-left / content-right;
  }

  ${TOCContainer} {
    display: ${({ showContents }) => (showContents ? "block" : "none")};
  }
`

export const SizeWrapper = styled.div`
  margin: 0 auto;
  max-width: var(--max-site-width);
`

export const Content = styled(SizeWrapper)`
  position: relative;
`
