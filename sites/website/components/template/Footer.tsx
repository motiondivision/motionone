import styled from "styled-components";
import Link from "next/link";
import React from "react";
import { TwitterIcon } from "../icons/Twitter";
import { screenM } from "./vars";
import { GithubLink } from "./GithubLink";

const Container = styled.footer`
  background: var(--primary);
  margin-top: 50px;
  padding: 50px 0;

  @media (max-width: ${screenM}) {
    padding: var(--padding);
  }

  svg {
    margin-left: 10px;
  }

  path {
    fill: var(--background);
  }
`;

const Headline = styled.span`
  font-size: 1.6rem;
  color: var(--secondary);
  cursor: pointer;
`;

const Spacing = styled.div`
  max-width: var(--max-body-width);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
`;

const P = styled.p`
  font-size: 1.4rem;
  color: var(--background);
`;

export function Footer() {
  return (
    <Container>
      <Spacing>
        <div>
          <P>&copy;{` ${new Date().getFullYear()} Matt Perry`}</P>
        </div>
        <div>
          <a href="https://twitter.com/mattgperry">
            <TwitterIcon />
          </a>
          <GithubLink />
        </div>
      </Spacing>
    </Container>
  );
}
