import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"
import { showSideNavWidth } from "./template/vars"
import { HeartIcon } from "./icons/Heart"
import { useSession } from "next-auth/client"

const Container = styled.nav`
  padding: 0 var(--padding);
  overflow-x: hidden;
  overflow-y: auto;
  position: sticky;
  top: 100px;
  height: calc(100vh - 100px);

  section {
    margin-bottom: calc(var(--padding) * 2);
  }

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    color: var(--foreground);
  }

  li a,
  .section-header {
    font-size: 1.4rem;
    line-height: 2.2rem;
    text-decoration: none;
  }

  .section-header {
    font-size: 1.6rem;
  }

  li {
    border-radius: 5px;
    padding: 2px 10px 4px;
    margin-left: -10px;

    &[data-is-current-page="true"] {
      background: var(--feint);
    }
  }

  @media (max-width: ${showSideNavWidth}) {
    padding: var(--padding);
    overflow-x: visible;
    position: static;

    ul {
      margin-bottom: 30px;
    }

    li a,
    .section-header {
      font-size: 16px;
      line-height: 24px;
      text-decoration: none;
    }

    section {
      margin-bottom: 20px;
    }
  }
`

interface Page {
  title: string
  link: string
  isAuth?: true
}

interface Section {
  title: string
  pages: Page[]
}

export const siteNav: Section[] = [
  {
    title: "Overview",
    pages: [
      {
        title: "Quick start",
        link: "/guides/quick-start",
      },
      {
        title: "Feature comparison",
        link: "/guides/feature-comparison",
      },
      {
        title: "WAAPI improvements",
        link: "/guides/waapi-improvements",
      },
      {
        title: "FAQs",
        link: "/guides/faqs",
      },
      {
        title: "Changelog",
        link: "/changelog",
        isAuth: true,
      },
    ],
  },
  {
    title: "API",
    pages: [
      {
        title: "Animate",
        link: "/dom/animate",
      },
      {
        title: "Timeline",
        link: "/dom/timeline",
      },
      {
        title: "Controls",
        link: "/dom/controls",
      },
      {
        title: "Stagger",
        link: "/dom/stagger",
      },
      {
        title: "Spring",
        link: "/dom/spring",
      },
      {
        title: "Glide",
        link: "/dom/glide",
      },
    ],
  },
  {
    title: "Guides",
    pages: [{ title: "Performance", link: "/guides/performance" }],
  },
  {
    title: "Examples",
    pages: [
      { title: "SVG loading spinner", link: "/examples/loading-spinner" },
      { title: "SVG path drawing", link: "/examples/path-drawing" },
    ],
  },
  // {
  //   title: "React",
  //   pages: [
  //     // {
  //     //   title: "Introduction",
  //     //   link: "/react",
  //     // },
  //     {
  //       title: "animated",
  //       link: "/react/animated",
  //     },
  //   ],
  // },
  // {
  //   title: "Guides",
  //   pages: [],
  // },
]

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 20 20"
      style={{ marginLeft: 5, fill: "var(--foreground)", opacity: 0.4 }}
    >
      <path d="M16.07 8H15V5s0-5-5-5-5 5-5 5v3H3.93A1.93 1.93 0 0 0 2 9.93v8.15A1.93 1.93 0 0 0 3.93 20h12.14A1.93 1.93 0 0 0 18 18.07V9.93A1.93 1.93 0 0 0 16.07 8zM10 16a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm3-8H7V5.5C7 4 7 2 10 2s3 2 3 3.5z" />
    </svg>
  )
}

function renderPageLink(page: Page) {
  const router = useRouter()
  const [session, isLoading] = useSession()
  let lockIcon = null

  if (page.isAuth && !session && !isLoading) {
    lockIcon = <LockIcon />
  }

  return (
    <li data-is-current-page={router.asPath === page.link} key={page.link}>
      <Link href={page.link}>
        <a style={{ display: "flex", alignItems: "center" }}>
          {page.title}
          {lockIcon}
        </a>
      </Link>
    </li>
  )
}

function renderSection(section: Section) {
  return (
    <section key={section.title}>
      <h2 className="section-header">{section.title}</h2>
      <ul>{section.pages.map(renderPageLink)}</ul>
    </section>
  )
}

interface Props {
  className?: string
}

export function SideMenu({ className }: Props) {
  return (
    <Container className={className}>
      <div>{siteNav.map(renderSection)}</div>
      <SponsorLink href="https://github.com/sponsors/mattgperry/">
        <HeartIcon /> Sponsor
      </SponsorLink>
    </Container>
  )
}

const SponsorLink = styled.a`
  color: var(--primary) !important;
  text-decoration: none;
  font-size: 18px;
  display: block;
  border-top: 1px solid var(--feint);
  margin-top: var(--padding);
  padding-top: var(--padding);
  display: flex;
  align-items: center;
  color: var(--primary);
  text-decoration: none;
  font-size: 16px;

  svg {
    margin-right: 5px;
  }

  path {
    stroke-width: 2px;
    fill: transparent;
  }
`
