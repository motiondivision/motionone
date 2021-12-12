import React, { useEffect } from "react"
import { animated } from "../animated"
import styled from "styled-components"
import { CTAButton } from "./tags"

const Overlay = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, #000 1px);
  background-size: 8px 8px;
  backdrop-filter: brightness(50%);
  will-change: transform, opacity;
  z-index: var(--z-modal);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalWindow = styled(animated.div)`
  max-width: 480px;
  padding: var(--padding) 40px;
  background: var(--background);
  border: 1px solid var(--primary);
  border-radius: 20px;
  will-change: transform;
  box-shadow: 20px 20px 0px rgba(0, 0, 0, 0.6);

  h1 {
    font-size: 28px;
    line-height: 36px;
  }

  p,
  li {
    font-size: 16px;
    line-height: 24px;
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0 20px;
  }

  .dismiss {
    text-decoration: underline;
    color: var(--white);
    font-size: 14px;
    font-weight: normal;
    margin-top: 20px;
  }
`

export function Sponsorwall({ close, presence }: any) {
  const [isPresent, safeToRemove] = presence

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      var isEscape = false
      if ("key" in e) {
        isEscape = e.key === "Escape" || e.key === "Esc"
      } else {
        isEscape = (e as any).keyCode === 27
      }
      isEscape && close()
    }

    document.body.style.overflow = "hidden"
    document.body.style.overscrollBehavior = "contain"
    document.body.addEventListener("keydown", closeOnEsc)

    return () => {
      document.body.style.overflow = "auto"
      document.body.style.overscrollBehavior = "initial"
      document.body.removeEventListener("keydown", closeOnEsc)
    }
  }, [])

  return (
    <Overlay
      initial={{ opacity: 0 }}
      style={{ opacity: isPresent ? 1 : 0 }}
      onComplete={(target) => {
        if (target.opacity === 0 && !isPresent) safeToRemove?.()
      }}
      options={{
        duration: isPresent ? 0.2 : 0.2,
        easing: isPresent ? [0.29, 0.04, 0.96, 0.7] : [0.41, 0.1, 0.93, 0.7],
      }}
      onClick={() => close()}
    >
      <ModalWindow
        initial={{ opacity: 0, transform: "translateY(300px)" }}
        style={{
          opacity: isPresent ? 1 : 0,
          transform: isPresent ? "none" : "scale(0.9)",
        }}
        options={
          isPresent
            ? ({
                duration: 0.7,
                delay: 0.2,
                transform: { easing: [0, 1.4, 0.59, 0.98] },
              } as any)
            : { duration: 0.2 }
        }
      >
        <SponsorwallBlurb />
        <div className="actions">
          <CTAButton
            as="a"
            href="https://github.com/sponsors/mattgperry"
            onClick={(e: any) => e.stopPropagation()}
          >
            Become a sponsor
          </CTAButton>
          <button className="dismiss" onClick={() => close()}>
            No thanks
          </button>
        </div>
      </ModalWindow>
    </Overlay>
  )
}

export function SponsorwallBlurb() {
  return (
    <>
      <h1>Support Motion One</h1>
      <p>Motion One is made possible thanks to the support of our sponsors!</p>
      <p>For just $5 a month:</p>
      <ul>
        <li>💬 Join the discussion</li>
        <li>💾 Read the source code</li>
        <li>🐞 File bug reports</li>
        <li>🙋🏾‍♀️ Make feature requests</li>
        <li>🎗 Support the project</li>
      </ul>
    </>
  )
}
