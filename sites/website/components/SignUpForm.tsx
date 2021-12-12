import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Tick } from "../components/icons/Tick"
import { post } from "../src/forms/post"
import { newsletterEndpoint } from "../src/forms/endpoints"
import { FormState } from "../src/forms/types"

const layoutTransition = {
  type: "spring",
  stiffness: 200,
  damping: 30,
}

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState(FormState.Entry)

  function handleSubmit(e: any) {
    e.preventDefault()

    if (state !== FormState.Entry) return

    setState(FormState.Submitting)

    post(newsletterEndpoint(), { email_address: email })
  }

  const showForm = state === FormState.Entry || state === FormState.Submitting

  const form = useRef<HTMLFormElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const [formBorderRadius, setFormBorderRadius] = useState<number | undefined>(
    undefined
  )
  const [buttonBorderRadius, setButtonBorderRadius] = useState<
    number | undefined
  >(undefined)
  useEffect(() => {
    if (!form.current) return
    setFormBorderRadius(
      parseFloat(window.getComputedStyle(form.current).borderRadius)
    )
    setButtonBorderRadius(
      parseFloat(window.getComputedStyle(button.current!).borderRadius)
    )
  }, [])

  return (
    <div className="signup" data-is-submitted={state !== FormState.Entry}>
      <AnimatePresence exitBeforeEnter>
        {showForm && (
          <motion.form
            action={newsletterEndpoint()}
            method="post"
            onSubmit={handleSubmit}
            key="form"
            ref={form}
            layout
            exit={{
              scale: 0.8,
              opacity: 0,
              transition: { duration: 0.25, ease: "easeIn" },
            }}
            transition={layoutTransition}
            onLayoutAnimationComplete={() =>
              state === FormState.Submitting && setState(FormState.Success)
            }
            style={
              state === FormState.Submitting
                ? {
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: formBorderRadius,
                    overflow: "hidden",
                  }
                : { borderRadius: formBorderRadius }
            }
          >
            <motion.input
              name="email_address"
              aria-label="Email Address"
              placeholder="you@domain.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              layout
              style={
                state === FormState.Submitting
                  ? {
                      position: "absolute",
                      opacity: 0,
                      transition: "opacity 50ms linear",
                    }
                  : {}
              }
            />
            <motion.button
              type="submit"
              layout
              ref={button}
              transition={layoutTransition}
              disabled={state === FormState.Submitting}
              style={{ borderRadius: buttonBorderRadius }}
            >
              <motion.span
                layout
                transition={layoutTransition}
                style={{
                  display: "inline-block",
                  textShadow: "1px 1px 0 rgba(0,0,0,0.1)",
                }}
              >
                Subscribe
              </motion.span>
            </motion.button>
          </motion.form>
        )}
        {state === FormState.Success && (
          <p style={{ display: "flex", alignItems: "center", height: 63 }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: "var(--success)",
                marginRight: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Tick initial="hidden" animate="visible" delay={0.6} />
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ display: "inline-block" }}
              transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
            >
              Thanks! Check your email for a confirmation link!
            </motion.span>
          </p>
        )}
      </AnimatePresence>
    </div>
  )
}
