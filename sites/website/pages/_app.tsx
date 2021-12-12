import type { AppProps } from "next/app"
import { createGlobalStyle } from "styled-components"
import { screenL, screenM } from "../components/template/vars"
import { Toast } from "../components/template/Toast"
import { Provider as AuthProvider } from "next-auth/client"

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family:"input-mono";
    src:url("https://use.typekit.net/af/f1b774/00000000000000007735b11b/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/f1b774/00000000000000007735b11b/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/f1b774/00000000000000007735b11b/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
    font-display:auto;font-style:normal;font-weight:400;
  }

  /* latin-ext */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  } 
  html {
    font-size: 10px;
    scroll-behavior: auto;

    @media (prefers-reduced-motion) { 
      scroll-behavior: auto;
    }
  }

  @media (max-width: ${screenM}) {
    html { font-size: 8px; }
  }

  body {
    --white: #F5F5F5;
    --black: #0F1115;
    --yellow: #FFF208;
    --strong-blue: #0D63F8;
    --blue: #31A6FA;
    --green: #57EB64;
    --pink: #FF2965;
    --red: #FF1231;
    --splash: #00FFDB;
    --feint: rgba(133, 150, 193, 0.1);
    --feint-solid: #1a1e26;

    --background: var(--black);
    --foreground: var(--white);
    --primary: var(--yellow);
    --secondary: var(--strong-blue);
    --success: var(--green);
    --error: var(--red);

    --max-site-width: 100%;
    --max-body-width: 700px;
    --max-show-nav-width: 1000px;
    --padding: 20px;
    --padding-large: 40px;

    --action-radius: 10px;

    --screen-l: ${screenL};

    --z-modal: 1100;
    --z-header: 1000;
    --z-code-block: 900;
    --z-toc: 100;

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: var(--background);
    font-family: Inter,sans-serif;
    font-weight: 400;
    font-style: normal;
    color: var(--foreground);

    @media (max-width: ${screenM}) {
      --padding-large: 20px;
    }
  }

  ::selection {
    color: var(--foreground);
    background-color: var(--secondary);
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
    background: transparent;
    white-space: nowrap;
    text-decoration: none;
    padding: 0;
    margin: 0;
  }

  h1, input, button, .headline {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-style: normal;
  }

  h2 {
    font-size: 2.8rem;
    font-weight: bold;
  }

  h3 {
    font-size: 2.2rem;
  }

  p, ul, ol, li, aside {
    font-size: 1.6rem;
    line-height: 2.8rem;
  }

  p, ul, ol, aside {
    margin: 0 0 2rem 0;
  }

  iframe {
    margin-bottom: 2rem;

    @media (max-width: 800px) {
      html { font-size: 9px; }
    }
  }

  ul, ol {
    padding: 0;
    padding-left: 2.8rem;
  }

  code, pre {
    font-family: input-mono, monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 1.5rem;
  }

  pre {
    margin-bottom: var(--padding);
  }

  p code,
  ol code,
  ul code,
  h2 code,
  h3 code,
  h4 code,
  h5 code {
    background: var(--feint);
    border: 1px solid var(--feint);
    padding: 0.3em;
    border-radius: 0.3em;
    white-space: normal;
  }

  p code {
    padding: 0.3rem;
  }

  h5 code {
    margin-left: -0.7rem
  }

  code[class*="language-"],
  pre[class*="language-"],
  div[class*="language-"] {
    color: var(--foreground);
    background: none;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    z-index: var(--z-code-block);
  }
  
  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    /* background: #f5f2f0; */
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #666;
  }

  .token.punctuation {
    color: #999;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: var(--pink);
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: var(--primary);
  }

  .token.operator,
  .token.entity {
    color: var(--foreground);
    opacity: 0.7;
  }

  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: var(--foreground);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: var(--splash);
  }

  .token.function,
  .token.class-name {
    color: var(--splash);
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: var(--yellow);
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .read-only textarea {
    display: none!important;
  }

  .token.entity {
    cursor: help;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <GlobalStyle />
      <Component {...pageProps} />
      <Toast />
    </AuthProvider>
  )
}
