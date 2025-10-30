// Homepage.jsx
import { Link } from 'react-router-dom'
import { FiCode, FiZap, FiEye, FiArrowRight } from 'react-icons/fi'
import Footer from './footer/footer'
import ExperiencesHome from './experiences/ExperiencesHome'

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      <ExperiencesHome />
      <Footer />
    </div>
  )
}