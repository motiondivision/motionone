import styled from "styled-components"
import Link from "next/link"
import { MenuIcon } from "../icons/Menu"
import { screenM, showSideNavWidth } from "./vars"
import { useState } from "react"
import { animated } from "../animated"
import { SideMenu } from "../SideMenu"
import { HeartIcon } from "../icons/Heart"

const SponsorLink = styled.a`
  display: flex !important;
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

  @media (max-width: ${showSideNavWidth}) {
    display: none !important;
  }
`

const Container = styled(animated.nav)<{ isOpen: boolean; inline?: boolean }>`
  background-color: transparent;
  background-image: radial-gradient(
    rgba(0, 0, 0, 0) 1px,
    var(--background) 1px
  );
  background-size: 4px 4px;
  backdrop-filter: brightness(100%) blur(3px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: var(--z-header);
  border-top: 2px solid var(--primary);

  svg {
    fill: var(--primary);
  }

  .menu {
    display: ${({ inline }) => (inline ? "block" : "none")};
  }

  ${SponsorLink} {
    display: ${({ inline }) => (inline ? "none" : "block")};
  }

  @media (max-width: ${showSideNavWidth}) {
    .menu {
      display: block;
    }

    .github-link {
      display: none;
    }
  }
`

const MenuWrapper = styled(animated.div)`
  transform-origin: 50% 10%;
`

const HomepageLink = styled.a`
  color: var(--primary);
  text-decoration: none;
`

const HeaderText = styled.h2`
  margin: 0;
  font-size: 2.2rem;
  line-height: 2.2rem;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  padding-left: var(--padding);
  padding-right: var(--padding);

  @media (max-width: ${screenM}) {
    font-size: 1.6rem;
    line-height: 1.6rem;
  }
`

const Icons = styled.div``

interface Props {
  inline?: boolean
}

export function Header({ inline }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Container
      inline={inline}
      isOpen={isMenuOpen}
      style={
        isMenuOpen
          ? { height: "100%", backgroundColor: "#000000ee" }
          : { height: "72px", backgroundColor: "#00000000" }
      }
      options={{ easing: [0.32, 0.08, 0.24, 1], duration: 0.4 }}
    >
      <TopBar>
        <HeaderText>
          <Link href="/" passHref>
            <HomepageLink>Motion One</HomepageLink>
          </Link>
        </HeaderText>
        <Icons>
          <SponsorLink href="https://github.com/sponsors/mattgperry/">
            <HeartIcon />
            Sponsor
          </SponsorLink>
          <MenuIcon
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isOpen={isMenuOpen}
            className="menu"
          />
        </Icons>
      </TopBar>
      <MenuWrapper
        style={
          isMenuOpen
            ? { opacity: 1, transform: "none" }
            : {
                opacity: 0,
                transform: "translateY(-10px) scale(0.9) translateZ(0)",
              }
        }
        options={{
          easing: [0.32, 0.08, 0.24, 1],
          duration: 0.5,
          delay: isMenuOpen ? 0.15 : 0,
        }}
      >
        <SideMenu />
      </MenuWrapper>
    </Container>
  )
}
