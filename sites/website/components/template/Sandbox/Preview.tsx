import { useRef, useState } from "react"
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect"
import styled from "styled-components"
import { Play } from "../../icons/Play"
import { animated } from "../../animated"
import { SandboxProps } from "./types"

type Props = {
  template?: string
  autoplay?: boolean
}

const LivePreview = styled.iframe`
  border: 0;
  margin: 0;
  padding: 0;
  border-left: 1px solid var(--feint);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  @media (max-width: 650px) {
    border-left: none;
    border-top: 1px solid var(--feint);
  }
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export function Preview({
  content,
  template = previewTemplate,
  autoplay,
}: SandboxProps & Props) {
  const { js, html, css } = content
  const [renderCount, setRenderCount] = useState(1)
  const [hasPressedPlay, setHasPressedPlay] = useState(false)

  if (hasPressedPlay || autoplay) {
    template = template.replace(
      token("js"),
      `<script>
        ${js}
      </script>`
    )
  }

  template = template.replace(token("html"), html)

  template = template.replace(
    token("css"),
    `<style>
      ${css}
    </style>`
  )

  const pingpong = useRef<any>(false)
  const ping = useRef<any>(null)
  const pong = useRef<any>(null)
  useIsomorphicLayoutEffect(() => {
    if (!hasPressedPlay && !autoplay) return

    const next = pingpong.current ? ping : pong
    const prev = pingpong.current ? pong : ping

    pingpong.current = !pingpong.current

    next.current.onload = () => {
      prev.current.style.visibility = "hidden"
      next.current.style.visibility = "visible"

      // Remove first to prevent adding to history
      const container = prev.current.parentElement
      container.removeChild(prev.current)
      prev.current.srcdoc = ""
      container.appendChild(prev.current)
    }

    const container = next.current.parentElement
    container.removeChild(next.current)
    next.current.srcdoc = template
    container.appendChild(next.current)

    return () => (next.current.onload = undefined)
  }, [template, renderCount, hasPressedPlay])

  const [initialTemplate] = useState(template)
  return (
    <Container>
      <div>
        <LivePreview
          ref={ping}
          srcDoc={initialTemplate}
          sandbox="allow-scripts"
        />
        <LivePreview
          ref={pong}
          srcDoc={initialTemplate}
          sandbox="allow-scripts"
          style={{ visibility: "hidden" }}
        />
      </div>
      <PlayButton
        onClick={() => {
          setRenderCount(renderCount + 1)
          setHasPressedPlay(true)
        }}
      />
    </Container>
  )
}

const Button = styled(animated.button)`
  position: absolute;
  bottom: var(--padding);
  right: var(--padding);
  width: 40px;
  height: 40px;
  background: var(--green);
  border-radius: 50%;
  z-index: 2;

  svg {
    transform: translate(1px, 1px);
  }

  path {
    fill: var(--background);
    stroke: none;
  }
`

function PlayButton({ onClick }: any) {
  return (
    <Button
      onClick={onClick}
      style={{ x: 0, y: 0, boxShadow: "2px 2px 0px #57EB6455" }}
      press={{ x: 2, y: 2, boxShadow: "none" }}
      options={{ duration: 0 }}
    >
      <Play />
    </Button>
  )
}

const token = (ext: string) => `<!-- ${ext} -->`

const previewTemplate = `
<html>
  <head>
    <style>
      @font-face {
        font-family: "input-mono";
        src: url("https://use.typekit.net/af/f1b774/00000000000000007735b11b/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
            format("woff2"),
          url("https://use.typekit.net/af/f1b774/00000000000000007735b11b/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
            format("woff"),
          url("https://use.typekit.net/af/f1b774/00000000000000007735b11b/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
            format("opentype");
        font-display: auto;
        font-style: normal;
        font-weight: 400;
      }

      /* latin-ext */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2)
          format("woff2");
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
          U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2)
          format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2)
          format("woff2");
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
          U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2)
          format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }

      html {
        font-size: 10px;
      }

      body {
        --white: #f5f5f5;
        --black: #0f1115;
        --yellow: #fff208;
        --strong-blue: #0d63f8;
        --blue: #31a6fa;
        --green: #57eb64;
        --pink: #ff2965;
        --red: #ff1231;
        --splash: #00ffdb;
        --feint: rgba(133, 150, 193, 0.1);

        --background: var(--black);
        --foreground: var(--white);
        --primary: var(--yellow);
        --secondary: var(--strong-blue);
        --success: var(--green);
        --error: var(--red);
        margin: 0;
        padding: 0;
        height: 100vh;
      }
    </style>
    <!-- css -->
  </head>
  <body>
    <!-- html -->
    <script src="/scripts/motion.min.js"></script>
    <script>
      const { animate, timeline, stagger, spring, glide } = Motion
    </script>
    <!-- js -->
  </body>
</html>
`
