import * as React from "react"
import { AnimationMetadata } from "../../types"
import styled from "styled-components"
import { ElementDetails } from "./ElementDetails"

interface Props {
  animation: AnimationMetadata
}

const Container = styled.nav`
  flex: 0 0 var(--sidebar-width);
  border-right: 1px solid var(--feint);
  background: var(--background-semi);
  backdrop-filter: blur(5px);
  padding: calc(10px + var(--row-height)) 10px 10px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;

  li {
    height: var(--row-height);
    padding-left: 25px;
    position: relative;
    display: flex;
    align-items: center;
  }

  li:before {
    position: absolute;
    content: "";
    display: block;
    bottom: 15px;
    left: 5px;
    width: 10px;
    height: var(--row-height);
    border: 2px solid var(--feint);
    border-top: none;
    border-right: none;
  }

  li:nth-child(2):before {
    height: 20px;
  }
`

export function Sidebar({ animation }: Props) {
  const children: any[] = []

  for (const elementName in animation) {
    const elementChildren: any[] = []
    const elementAnimations = animation[elementName]

    for (const valueAnimation of elementAnimations) {
      elementChildren.push(
        <li key={valueAnimation.valueName}>
          <code>{valueAnimation.valueName}</code>
        </li>
      )
    }

    children.push(
      <ul key={elementName}>
        <ElementDetails name={elementName} />
        {elementChildren}
      </ul>
    )
  }

  return <Container>{children}</Container>
}
