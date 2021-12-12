import React from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import path from "path"
import { readdir, readFile } from "fs/promises"
import { Head } from "../../components/template/Head"
import styled from "styled-components"
import { FullscreenSandbox } from "../../components/template/Sandbox"
import { Header } from "../../components/template/Header"

interface FileMetaData {
  name: string
  description: string
}

interface FileData {
  name: string
  extension: string
  content: string
}

interface ExampleProps {
  tabs: FileData[]
  meta: FileMetaData
}

function ExampleTemplate(props: ExampleProps) {
  return (
    <Page>
      <Head
        title={`${props.meta.name} example | Motion One`}
        description={props.meta.description}
        // image={meta.shareImage}
      />
      <div style={{ height: 72, flexShrink: 0 }}>
        <Header inline />
      </div>
      <Example {...props} />
    </Page>
  )
}

export default ExampleTemplate

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

function Example({ tabs }: ExampleProps) {
  const [js, html, css] = tabs

  return (
    <FullscreenSandbox
      content={{ js: js.content, html: html.content, css: css.content }}
    />
  )
}

/**
 * Data
 */

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "loading-spinner" } },
      { params: { id: "path-drawing" } },
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  const baseDir = path.join(
    __dirname,
    "../",
    "../",
    "../",
    "../",
    "examples",
    "dom"
  )

  const dir = path.join(baseDir, id as string)

  const tabs: FileData[] = []
  let meta: FileMetaData
  const files = await readdir(dir)
  for (const file of files) {
    const [filename, extension] = file.split(".")
    const content = await readFile(path.join(dir, file), "utf8")

    if (extension !== "json") {
      tabs.push({
        name: filename === "index" ? labels[extension] : file,
        extension,
        content,
      })
    } else {
      meta = JSON.parse(content) as FileMetaData
    }
  }

  tabs.sort(compareExtension)

  return {
    props: { id, tabs, meta } as ExampleProps,
  }
}

const labels = {
  js: "JavaScript",
  html: "HTML",
  css: "CSS",
}

function compareExtension(_a: FileData, b: FileData) {
  return b.name === labels.js ? 1 : -1
}
