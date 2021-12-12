import { useRouter } from "next/router"
import { siteNav } from "../SideMenu"
import { Play } from "../icons/Play"
import Link from "next/link"
import styled from "styled-components"

const Container = styled.nav`
  display: flex;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid var(--feint);

  div {
    display: flex;
    flex: 1;
    flex-shrink: 0;

    svg {
      height: 18px;
    }
  }

  .prev {
    justify-content: flex-start;

    svg {
      transform: scaleX(-1);
      margin-right: var(--padding);
    }
  }

  .next {
    justify-content: flex-end;
    svg {
      margin-left: var(--padding);
    }
  }

  a {
    border: 2px solid var(--foreground);
    border-radius: var(--action-radius);
    padding: 15px 18px;
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    color: var(--foreground);
    text-decoration: none;
    display: flex;
    align-items: center;
  }
`

export function PrevNext() {
  const router = useRouter()

  let catIndex = 0
  let pageIndex = 0
  let pageFound = false

  for (catIndex = 0; catIndex < siteNav.length; catIndex++) {
    const category = siteNav[catIndex].pages

    for (pageIndex = 0; pageIndex < category.length; pageIndex++) {
      const page = category[pageIndex]

      if (router.asPath === page.link) {
        pageFound = true
        break
      }
    }

    if (pageFound) break
  }

  if (!pageFound) return null

  const { pages } = siteNav[catIndex]
  const prevPage = pages[pageIndex - 1]
  const nextPage = pages[pageIndex + 1]

  return (
    <Container>
      <div className="prev">
        {prevPage ? (
          <Link href={prevPage.link}>
            <a>
              <Play />
              {prevPage.title}
            </a>
          </Link>
        ) : null}
      </div>
      <div className="next">
        {nextPage ? (
          <Link href={nextPage.link}>
            <a>
              {nextPage.title}
              <Play />
            </a>
          </Link>
        ) : null}
      </div>
    </Container>
  )
}
