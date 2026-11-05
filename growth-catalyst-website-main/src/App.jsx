import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MemberProfilePage from './pages/MemberProfilePage'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import InternPage from './pages/InternPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team/:memberId" element={<MemberProfilePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/intern" element={<InternPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
