import NextHead from "next/head"
import { useRouter } from "next/router"

const domain = "https://motion.dev"

export function Head({
  title = "Motion One: The Web Animations API for everyone",
  description = "A new library for animation libraries on the web. Built on the Web Animations API for a tiny bundlesize and great performance.",
  image = "social/share.png",
}) {
  const url = domain + useRouter().pathname
  const shareImage = domain + "/" + image

  return (
    <NextHead>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={shareImage} />
      <link rel="canonical" href={url} />
      <meta name="theme" content="#0A0911" />
      <link rel="icon" href="/layout/favicon.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mattgperry" />
      <meta name="twitter:creator" content="@mattgperry" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <script
        defer
        data-domain="motion.dev"
        src="https://plausible.io/js/plausible.js"
      ></script>
    </NextHead>
  )
}
