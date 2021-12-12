const { MDXProvider } = require("@mdx-js/react")
import { ReactChild } from "react"
import { Head } from "./template/Head"
import { Header } from "./template/Header"
import { Footer } from "./template/Footer"
import { H1, H2, H3, H4, A, Image } from "./template/tags"
import { PostContentSignup } from "./newsletter/forms"
import { ContentHeader } from "./template/ContentHeader"
import {
  Content,
  ContentContainer,
  NavContainer,
  BodyContainer,
  TOC,
} from "./newsletter/styled"
import { CodeBlock } from "./template/tagsCode"

const components = {
  h2: H2,
  h3: H3,
  h4: H4,
  a: A,
  nav: TOC,
  img: Image,
  code: CodeBlock,
}

interface Props {
  children: ReactChild[]
  meta?: {
    issue: number
    title?: string
    description?: string
    date?: number
    shareImage?: string
  }
}

export function Post({ meta, children }: Props) {
  const [nav, ...content] = children
  meta = meta!
  return (
    <MDXProvider components={components}>
      <Head
        title={`${meta.title} | Motion.dev`}
        description={meta.description}
        image={meta.shareImage}
      />
      <Header />
      <ContentHeader>
        <H1>{meta.title}</H1>
      </ContentHeader>
      <ContentContainer>
        <Content as="article">
          <NavContainer>{nav}</NavContainer>
          <BodyContainer>
            {content}

            <PostContentSignup>
              <p>
                {`Did you enjoy this tutorial? There's more to come on Motion.dev.
                To stay updated, sign up to the newsletter!`}
              </p>
            </PostContentSignup>
          </BodyContainer>
          <Footer />
        </Content>
      </ContentContainer>
    </MDXProvider>
  )
}
