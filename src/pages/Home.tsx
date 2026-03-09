import Hero from '../components/Hero'
import AboutVision from '../components/AboutVision'
import Intro from '../components/Intro'
import Features from '../components/Features'
import Investment from '../components/Investment'
import WhyInvest from '../components/WhyInvest'
import Offerings from '../components/Offerings'
import Projects from '../components/Projects'
import CoreValues from '../components/CoreValues'
import Team from '../components/Team'
import Blog from '../components/Blog'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <main>
      <Hero />
      <AboutVision />
      <Intro />
      <Features />
      <Investment />
      <Offerings />
      <Projects />
      <CoreValues />
      <Team />
      <WhyInvest />
      <Testimonials />
      <Blog />
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}

export default Home
