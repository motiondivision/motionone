import { Head } from "../components/template/Head"
import { HomepageHeader } from "../components/homepage/HomepageHeader"
import { HomepageFooter } from "../components/homepage/HomepageFooter"
import { USPs } from "../components/homepage/USPs"

function HomePage() {
  return (
    <>
      <Head />
      <HomepageHeader />
      <USPs />
      <HomepageFooter />
    </>
  )
}

export default HomePage
