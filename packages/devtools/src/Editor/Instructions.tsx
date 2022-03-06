import { motion } from "framer-motion"
import * as React from "react"
import styled from "styled-components"
import { RecordIcon } from "./icons/RecordIcon"

const Container = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`

const RecordIconContainer = styled.div`
  border: 1px solid var(--feint);
  border-radius: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 0 5px;
  transform: translateY(3px);
`

export function Instructions() {
  return (
    <Container
      exit={{ scale: 0.925, opacity: 0 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0 }}
    >
      <p>
        Click the{" "}
        <RecordIconContainer>
          <RecordIcon />
        </RecordIconContainer>{" "}
        record button to start recording animations.
      </p>
    </Container>
  )
}
