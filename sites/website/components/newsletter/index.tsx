const { MDXProvider } = require("@mdx-js/react")
import { ReactChild } from "react"
import { Head } from "../template/Head"
import { Header } from "../template/Header"
import { Footer } from "../template/Footer"
import { H2, H3, H4, A } from "../template/tags"
import { ContentHeader } from "../template/ContentHeader"
import {
  H1,
  Content,
  ContentContainer,
  NavContainer,
  BodyContainer,
  TOC,
} from "./styled"
import { CodeBlock } from "../template/tagsCode"

const components = {
  h2: H2,
  h3: H3,
  h4: H4,
  a: A,
  nav: TOC,
  code: CodeBlock,
}

interface Props {
  children: ReactChild[]
  meta?: {
    issue: number
    title?: string
    description?: string
    date?: number
  }
}

export function Newsletter({ meta, children }: Props) {
  const [nav, ...content] = children
  meta = meta!

  return (
    <MDXProvider components={components}>
      <Head
        title={`Issue ${meta.issue}: ${meta.title} | Motion.dev newsletter`}
        description={meta.description}
      />
      <Header />
      <ContentHeader>
        <H1>
          Issue
          <br />
          <span>{`#${labelledNumbers[meta.issue] || meta.issue}`}</span>
        </H1>
      </ContentHeader>
      <ContentContainer>
        <Content as="article">
          <NavContainer>{nav}</NavContainer>
          <BodyContainer>{content}</BodyContainer>
          <Footer />
        </Content>
      </ContentContainer>
    </MDXProvider>
  )
}

const labelledNumbers = [
  ,
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
]
