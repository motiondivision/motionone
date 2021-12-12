import React, { useRef, useState } from "react"
import styled from "styled-components"
import { useInViewport } from "../src/use-in-viewport"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { FormState } from "../src/forms/types"
import { post } from "../src/forms/post"
import { newsletterEndpoint } from "../src/forms/endpoints"
import { Tick } from "./icons/Tick"

const Container = styled(motion.div)`
  --accent: #ddd;
  margin-bottom: 4rem;
  margin-top: 8rem;
  border: 1px dashed rgba(0, 0, 0, 0.08);
  background: var(--feint);
  border-radius: 10px;
  padding: var(--padding);
  display: flex;
  flex-direction: column;

  input {
    position: absolute;
  }

  form {
    width: auto;
  }

  &[data-state="entry"] {
    --accent: var(--secondary);

    form {
      width: calc(100% - 10px);
    }

    input {
      position: static;
    }
  }
`

const Form = styled(motion.form)`
  background: var(--background);
  border: 2px solid var(--accent);
  transition: border-color 150ms linear 50ms;
  border-radius: 5px;
  display: flex;
  justify-content: stretch;
  padding: 5px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;

  input,
  button {
    font-size: 1.6rem;
    line-height: 1.6rem;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const SuccessContainer = styled(motion.p)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  height: 46px;
`

const InputEmail = styled(motion.input)`
  background: transparent;
  color: var(--foreground);
  border: none;
  flex: 1;
  outline: none;
  padding: 10px 12px;
`

const Submit = styled(motion.button)`
  flex: 0;
  color: var(--foreground);
  background: var(--accent);
  transition: background-color 150ms linear 50ms;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
  border: 2px dashed transparent;
  border-radius: 2px;
  padding: 10px 12px;
  outline: none;
`

const layoutTransition = {
  type: "spring",
  stiffness: 200,
  damping: 30,
}

export interface SignUpProps {
  children?: any
  submit?: string
  id?: number
  style?: React.CSSProperties
}

export function SignUpContent({
  children,
  submit = "Subscribe",
  id,
  style,
}: SignUpProps) {
  const formRef = useRef(null)
  const [email, setEmail] = useState("")
  const [state, setState] = useState(FormState.Entry)

  const { hasEnteredViewport } = useInViewport(formRef)

  const showForm = state === FormState.Entry || state === FormState.Submitting

  function handleSubmit(e: any) {
    e.preventDefault()

    if (state !== FormState.Entry) return

    setState(FormState.Submitting)

    post(newsletterEndpoint(id), { email_address: email })
  }

  return (
    <Container
      ref={formRef}
      data-state={state}
      transition={{ type: "spring", duration: 1, bounce: 0.3, delay: 0.5 }}
      initial={false}
      animate={
        hasEnteredViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
      }
      style={{ ...style }}
    >
      {children}
      <AnimatePresence exitBeforeEnter>
        {showForm && (
          <Form
            action={newsletterEndpoint(id)}
            method="post"
            onSubmit={handleSubmit}
            key="form"
            layout
            exit={{ scale: 0, opacity: 0 }}
            transition={layoutTransition}
            onLayoutAnimationComplete={() => {
              if (state === FormState.Submitting) {
                setState(FormState.Success)
              }
            }}
          >
            <InputEmail
              name="email_address"
              aria-label="Email Address"
              placeholder="you@domain.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              initial={false}
              animate={{ opacity: state === FormState.Entry ? 1 : 0 }}
              layout="position"
              transition={layoutTransition}
            />
            <Submit
              type="submit"
              disabled={state === FormState.Submitting}
              layout
              transition={layoutTransition}
            >
              <motion.span
                layout="position"
                style={{ display: "inline-block" }}
              >
                {submit}
              </motion.span>
            </Submit>
          </Form>
        )}
        {state === FormState.Success && (
          <SuccessContainer
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <TickContainer variants={tickContainerVariants}>
              <Tick />
            </TickContainer>
            <SuccessMessage variants={successMessageVariants}>
              Thanks! Check your email for a confirmation link.
            </SuccessMessage>
          </SuccessContainer>
        )}
      </AnimatePresence>
    </Container>
  )
}

const containerVariants: Variants = {
  visible: {
    transition: { delayChildren: 0.2 },
  },
}

const tickContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delayChildren: 0.3 },
  },
}

const successMessageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.9, duration: 0.5, ease: "easeOut" },
  },
}

const TickContainer = styled(motion.span)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--success);
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`

const SuccessMessage = styled(motion.span)`
  display: inline-block;
  line-height: 2.2rem;
`
