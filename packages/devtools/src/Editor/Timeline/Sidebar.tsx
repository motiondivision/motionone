import * as React from "react"
import { AnimationMetadata } from "../../types"
import styled from "styled-components"
import { ElementDetails } from "./ElementDetails"

interface Props {
  animation: AnimationMetadata
}

export const SidebarContainer = styled.section`
  flex: 0 0 var(--sidebar-width);
  width: var(--sidebar-width);
  background-color: transparent;
  background-image: radial-gradient(
    rgba(0, 0, 0, 0) 1px,
    var(--background) 1px
  );
  background-size: 4px 4px;
  backdrop-filter: blur(3px);
  padding: calc(10px + var(--row-height)) 20px 20px;
  position: sticky;
  top: 0;
  bottom: 0;
  z-index: 5;
`

const Container = styled(SidebarContainer)`
  left: 0;
  border-right: 1px solid var(--feint);

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
  const { elements } = animation
  const children: any[] = []

  for (const elementName in elements) {
    const elementChildren: any[] = []
    const elementAnimations = animation.elements[elementName]

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
