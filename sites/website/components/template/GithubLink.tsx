import { AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/client"
import React, { useState } from "react"
import { GithubIcon } from "../icons/Github"
import { Modal } from "./Modal"
import { Sponsorwall } from "./Sponsorwall"

export function GithubLink() {
  const [session] = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const checkSponsorship = (e: any) => {
    if (!session) {
      e.preventDefault()
      setIsOpen(true)
    }
  }

  return (
    <>
      <a
        href="https://github.com/motiondivision/motionone"
        onClick={checkSponsorship}
        className="github-link"
      >
        <GithubIcon />
      </a>
      <AnimatePresence>
        {isOpen && (
          <Modal key="modal">
            <Sponsorwall close={() => setIsOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
