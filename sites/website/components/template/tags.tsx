import styled from "styled-components"
import Link from "next/link"
import NextImage from "next/image"
import { screenM } from "./vars"

interface HeaderProps {
  id: string
  children: string
  level: number
  Tag: any
}

export function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="-2 -2 24 24"
    >
      <g transform="translate(6 1) rotate(45 3.5 8.5)">
        <path
          d="M 3.5 7 C 0.13 7 0 9.5 0 9.5 L 0 14.429 C 0 14.429 0.13 17 3.5 17 C 6.87 17 7 14.429 7 14.429 L 7 12"
          fill="transparent"
          strokeWidth="2"
          stroke="var(--foreground)"
          strokeLinecap="round"
        ></path>
        <path
          d="M 3.5 0 C 0.13 0 0 2.5 0 2.5 L 0 7.429 C 0 7.429 0.13 10 3.5 10 C 6.87 10 7 7.429 7 7.429 L 7 5"
          transform="rotate(180 3.5 5)"
          fill="transparent"
          strokeWidth="2"
          stroke="var(--foreground)"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  )
}

export const H1 = styled.h1`
  font-size: 5.6rem;
  line-height: 6.2rem;
  color: var(--foreground);
  margin: 0;

  @media (max-width: ${screenM}) {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }
`

// TODO Replace 60 wit header hight
const Anchor = styled("a")<{ name: string }>`
  opacity: 0;
  position: absolute;
  top: -60px;
  left: -40px;
  padding-top: 65px;
  transition: opacity 100ms linear;

  svg {
    border: 2px dashed transparent;
    border-radius: 50%;
  }

  &:focus,
  &:active {
    opacity: 1;
    outline: none;

    svg {
      border: 2px dashed var(--blue);
    }
  }
`

const Header = styled("h2")`
  --header-size: 3.6rem;
  --header-line-height: 4.2rem;
  display: block;
  font-size: var(--header-size);
  line-height: var(--header-line-height);
  letter-spacing: -0.1rem;
  margin: 4rem 0 2rem;
  position: relative;

  code {
    font-size: calc(var(--header-size) - 0.4rem);
    line-height: var(--header-line-height);
  }

  &:hover {
    ${Anchor} {
      opacity: 1;
    }
  }
` as any

const Header3 = styled(Header)`
  --header-size: 2.8rem;
  --header-line-height: 3.4rem;
`

const Header4 = styled(Header)`
  --header-size: 2.4rem;
  --header-line-height: 3rem;
`

const Header5 = styled(Header)`
  --header-size: 2.2rem;
  --header-line-height: 2.4rem;
`

function HeaderWithAnchor({ id, children, level, Tag }: HeaderProps) {
  return (
    <Tag as={"h" + level}>
      <Anchor name={id} id={id} href={"#" + id}>
        <LinkIcon />
      </Anchor>
      {children}
    </Tag>
  )
}

const LinkStyling = styled.a`
  color: var(--blue);
  text-decoration: none;
  border-bottom: 2px dashed transparent;
  transition: 100ms border-color linear;

  &:focus {
    outline: none;
    border-bottom: 2px dashed var(--blue);
  }
`

interface LinkProps {
  children: React.ReactChild
  alt: string
  href: string
}

export const A = ({ children, ...props }: LinkProps) => (
  <Link {...props} passHref>
    <LinkStyling>{children}</LinkStyling>
  </Link>
)

export const H2 = (props: HeaderProps) => (
  <HeaderWithAnchor {...props} Tag={Header} level={2} />
)

export const H3 = (props: HeaderProps) => (
  <HeaderWithAnchor {...props} Tag={Header3} level={3} />
)

export const H4 = (props: HeaderProps) => (
  <HeaderWithAnchor {...props} Tag={Header4} level={4} />
)

export const H5 = (props: HeaderProps) => (
  <HeaderWithAnchor {...props} Tag={Header5} level={5} />
)

const ImageContainer = styled.div`
  margin-bottom: 4rem;
  position: relative;
  height: 0;
`

const FixTypesImage = NextImage as any
export const Image = ({ width, height, ...props }: any) => {
  return (
    <ImageContainer style={{ paddingBottom: `${(height / width) * 100}%` }}>
      <FixTypesImage {...props} layout="fill" />
    </ImageContainer>
  )
}

export const Note = styled.aside`
  background-color: rgba(0, 0, 0, 0.03);
  border-left: 5px solid var(--primary);
  border-radius: 5px;
  margin-left: -20px;
  padding: 2rem;
`

export const CTAButton = styled.button`
  font-size: 2.2rem;
  line-height: 1.7;
  letter-spacing: -0.3px;
  color: var(--foreground);
  border-radius: 40px;
  line-height: 1.2;
  letter-spacing: -0.1rem;
  font-weight: 700;
  font-family: "Inter-Bold", "Inter", sans-serif;
  color: var(--foreground);
  padding: 14px 21px 14px;
  border: 2px solid var(--secondary);
  background-color: var(--secondary);
  text-decoration: none;
  padding: 14px 21px 14px;
`

export const HR = styled.hr`
  border: none;
  border-top: 1px solid var(--feint);
  margin: calc(var(--padding) * 2) 0 var(--padding);
  width: 100%;
`
