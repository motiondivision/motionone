import { useState } from "react"
import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-css"

interface Props {
  children: string
  language: string
  onChange?: (newCode: string) => void
}

const highlighters = {
  "language-css": languages.css,
  "language-javascript": languages.js,
  "language-markup": languages.markup,
}

/**
 * TODO
 * - Display current language
 * - Add outline for when box is editable
 */
export function CodeBlock({
  children,
  language = "language-javascript",
  onChange,
}: Props) {
  return (
    <div style={{ padding: "var(--padding) 0" }}>
      <Editor
        value={children.substring(0, children.length - 1)}
        onValueChange={onChange}
        highlight={(code) => highlight(code, highlighters[language])}
        style={{
          fontSize: "1.4rem",
          lineHeight: "2.4rem",
          height: "100%",
          overflowY: "auto",
        }}
        className={`${language} ${onChange ? "" : "read-only"}`}
        textareaClassName="editable-text"
      />
    </div>
  )
}
