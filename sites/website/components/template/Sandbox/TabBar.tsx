import styled from "styled-components"
import { motion, AnimateSharedLayout } from "framer-motion"

const TabBarContainer = styled.nav`
  border-bottom: 1px solid var(--feint);
  flex-shrink: 0;
  flex-grow: 0;

  ul {
    display: flex;
    padding: 0 var(--padding);
    margin: 0;
  }

  ul,
  li {
    list-style: none;
  }

  li {
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    padding: 15px 0;
    margin-right: var(--padding);
    cursor: pointer;
    position: relative;

    > span {
      opacity: 0.5;
      transition: 150ms opacity linear;
    }

    > div {
      height: 2px;
      width: 100%;
      position: absolute;
      bottom: 0;
      background-color: var(--primary);
    }
  }

  li.selected > span {
    opacity: 1;
    transition: 300ms opacity linear;
  }
`

const labels = {
  html: "HTML",
  js: "JavaScript",
  css: "CSS",
}

export function TabBar({ tabs, setTab, selectedTab }: any) {
  return (
    <TabBarContainer>
      <AnimateSharedLayout>
        <ul>
          {tabs.map((tab: any) => (
            <li
              key={tab}
              className={selectedTab === tab ? "selected" : ""}
              onClick={() => setTab(tab)}
            >
              <span>{labels[tab]}</span>
              {selectedTab === tab && <motion.div layoutId="underline" />}
            </li>
          ))}
        </ul>
      </AnimateSharedLayout>
    </TabBarContainer>
  )
}
