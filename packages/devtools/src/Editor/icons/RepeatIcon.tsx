import * as React from "react"

interface Props {
  style?: React.CSSProperties
}

export function RepeatIcon({ style }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={style}>
      <title>Repeat</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M320 120l48 48-48 48"
      />
      <path
        d="M352 168H144a80.24 80.24 0 00-80 80v16M192 392l-48-48 48-48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M160 344h208a80.24 80.24 0 0080-80v-16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  )
}
