import { animate as popmotionAnimate, cubicBezier, mix } from "popmotion"
import { animate } from "motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { ExampleContainer, PlayButton, Ball } from "./waapi-improvements"

export function JankExample() {
  const waapiRef = useRef<HTMLDivElement>(null)
  const jsRef = useRef<HTMLDivElement>(null)
  const [isPlaying] = useState(true)

  const blockJavaScript = useCallback(() => {
    const timeStart = performance.now()
    let jank = true
    while (jank) {
      if (performance.now() - timeStart > 2000) {
        jank = false
      }
    }
  }, [])

  useEffect(() => {
    // if (!isPlaying) return

    const waapiAnimation = animate(
      waapiRef.current as any,
      {
        transform: ["scale(0.5) translateZ(0)", "scale(1.5) translateZ(0)"],
        opacity: [0.5, 1],
      },
      {
        duration: 1,
        repeat: Infinity,
        direction: "alternate",
        easing: [0.28, 0, 0.34, 0.99],
        allowWebkitAcceleration: true,
      }
    )

    const jsAnimation = popmotionAnimate({
      from: 0,
      to: 1,
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1000,
      onUpdate: (v) => {
        if (!jsRef.current) return
        jsRef.current.style.transform = `scale(${mix(0.5, 1.5, v)})`
        jsRef.current.style.opacity = `${mix(0.5, 1, v)}`
      },
      ease: cubicBezier(0.28, 0, 0.34, 0.99),
    })

    return () => {
      waapiAnimation.stop()
      jsAnimation.stop()
    }
  }, [isPlaying])

  return (
    <ExampleContainer>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div
          style={{
            display: "flex",
            marginBottom: "var(--padding)",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Ball
              ref={waapiRef}
              style={{ transform: "scale(0.5)", opacity: 0.5 }}
            />
            <span
              style={{
                marginTop: "var(--padding)",
                display: "block",
                fontSize: "1.8rem",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Motion One
            </span>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Ball
              ref={jsRef}
              style={{ transform: "scale(0.5)", opacity: 0.5 }}
            />
            <span
              style={{
                marginTop: "var(--padding)",
                display: "block",
                fontSize: "1.8rem",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Other JavaScript libraries
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isPlaying && (
            <PlayButton
              onClick={blockJavaScript}
              style={{ "--color": "var(--error)", position: "static" }}
            >
              Block JavaScript
            </PlayButton>
          )}
        </div>
      </div>
    </ExampleContainer>
  )
}
