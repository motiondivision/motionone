import styled from "styled-components";
import { MotionConfig, motion } from "framer-motion";

const Container = styled(motion.div)`
  width: 50px;
  height: 30px;
  border-radius: 20px;
  padding: 5px;
  cursor: pointer;
  display: flex;
`;

const Handle = styled(motion.div)`
  background: var(--foreground);
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export interface SwitchProps {
  on: boolean;
  onClick: () => void;
}

export function Switch({ on, onClick }: SwitchProps) {
  return (
    <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}>
      <Container
        initial={false}
        animate={{
          backgroundColor: on ? "var(--primary)" : "var(--background)",
        }}
        onClick={onClick}
        style={{ justifyContent: on ? "flex-end" : "flex-start" }}
      >
        <Handle layout />
      </Container>
    </MotionConfig>
  );
}
