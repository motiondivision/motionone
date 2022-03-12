import { motion } from "framer-motion"
import * as React from "react"
import styled from "styled-components"

const Container = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p,
  a {
    font-size: 16px;
  }

  a {
    color: var(--blue);
    text-decoration: underline;
    cursor: pointer;
  }
`

const LoginButton = styled(motion.button)`
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  padding: 15px 20px;
  border-radius: 10px;
  background: var(--strong-blue);
  color: var(--white);
  margin: 20px 0;
`

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.8, bounce: 0 },
  },
}

export function LoginDialog() {
  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.p variants={variants}>
        Motion Editor is exclusive for Motion One Pro members
      </motion.p>
      <LoginButton
        onClick={() => chrome.tabs.create({ url: "https://motion.dev/login" })}
        variants={variants}
      >
        Sign in with Github
      </LoginButton>
      <motion.p variants={variants}>
        Or sign up for{" "}
        <a
          onClick={(e) => {
            e.preventDefault()
            chrome.tabs.create({ url: "https://motion.dev/sponsor" })
          }}
        >
          Motion One Pro
        </a>
      </motion.p>
    </Container>
  )
}
