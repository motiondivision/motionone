import { MDXProvider } from "@mdx-js/react"
import { ReactChild } from "react"
import { Head } from "./template/Head"
import { Header } from "./template/Header"
import { Footer } from "./template/Footer"
import { Login } from "./template/Login"
import { H1, H2, H3, H4, H5, HR, A, Image } from "./template/tags"
import { SideMenu } from "./SideMenu"
import { ContentHeader } from "./template/ContentHeader"
import {
  Content,
  ContentContainer,
  BodyContainer,
  TOC,
} from "./newsletter/styled"
import { CodeBlock } from "./template/tagsCode"
import { useSession } from "next-auth/client"
import styled from "styled-components"
import { screenM, showSideNavWidth } from "./template/vars"
import { PrevNext } from "./template/PrevNext"
import { SponsorwallBlurb } from "./template/Sponsorwall"
import { PostContentSignup } from "./newsletter/forms"

const PageWithSideNav = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 320px) 1fr;
  margin-top: 220px;
  position: relative;

  @media (max-width: ${showSideNavWidth}) {
    display: block;

    .side-nav {
      display: none;
    }
  }

  @media (max-width: ${screenM}) {
    margin-top: 120px;
  }
`

const ContentWrapper = styled.div``

const components = {
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  a: A,
  nav: TOC,
  img: Image,
  code: CodeBlock,
  hr: HR,
}

interface Props {
  children: ReactChild[]
  meta?: {
    issue?: number
    title?: string
    description?: string
    date?: number
    shareImage?: string
    needsSponsorship?: boolean
    showContents?: boolean
  }
  version?: string
}

export function AuthDocTemplate({ meta, children, version }: Props) {
  const [session, isLoading] = useSession()
  let isAllowedToView = false

  if (!meta.needsSponsorship) {
    isAllowedToView = true
  } else {
    isAllowedToView = Boolean(session)
  }

  const { showContents = true } = meta

  return (
    <MDXProvider components={components}>
      <Head
        title={`${meta.title} | Motion One`}
        description={meta.description}
        image={meta.shareImage}
      />
      <Header />

      <PageWithSideNav>
        <SideMenu className="side-nav" />
        <ContentWrapper>
          <ContentHeader>
            <H1>{meta.title}</H1>
          </ContentHeader>
          <ContentContainer>
            <Content as="article">
              <BodyContainer showContents={showContents}>
                {isLoading && !isAllowedToView ? (
                  <p>Checking sponsorship status</p>
                ) : isAllowedToView ? (
                  children
                ) : (
                  <LoginDialog />
                )}

                <PrevNext />

                {!meta.needsSponsorship && !session && !isLoading && (
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.2)",
                      marginTop: 100,
                      marginBottom: 40,
                      paddingTop: 100,
                    }}
                  >
                    <SponsorwallBlurb />
                    <Login />
                  </div>
                )}

                <PostContentSignup>
                  <p>
                    Stay updated with the Motion One newsletter. We don't spam,
                    and unsubscription is instant.
                  </p>
                </PostContentSignup>
              </BodyContainer>
            </Content>
          </ContentContainer>
        </ContentWrapper>
      </PageWithSideNav>
      <Footer />
    </MDXProvider>
  )
}

function LoginDialog() {
  return (
    <>
      <p>This page is currently available in Early Access for sponsors.</p>
      <Login />
    </>
  )
}
