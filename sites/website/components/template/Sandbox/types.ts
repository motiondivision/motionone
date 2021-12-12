export interface SandboxContent {
  js: string
  html: string
  css: string
}

export interface SandboxProps {
  content: SandboxContent
  autoplay?: boolean
  showTabs?: boolean
  authEdit?: boolean
}
