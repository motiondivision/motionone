import styled from "styled-components";
import { SizeWrapper } from "../newsletter/styled";
import { screenM } from "./vars";

const Container = styled.header`
  padding: 0 var(--padding);

  @media (max-width: ${screenM}) {
    height: auto;
  }
`;

const Content = styled(SizeWrapper)`
  max-width: var(--max-body-width);
  display: flex;
  align-items: flex-end;
  padding-bottom: var(--padding-large);
  flex: 1;
`;

export function ContentHeader({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}
